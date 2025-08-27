// src/services/notices.service.js
import fs from "node:fs/promises";
import { toWebpResized } from "../utils/image-process.js";
import { sanitizeFilename, nowStamp } from "../utils/path-helpers.js";
import * as noticeModel from "../models/notices.model.js";
import * as imageModel from "../models/notice_images.model.js";
import {
  toBucketPath,
  removeFromNotices,
  uploadBufferToNotices,
} from "./storage.service.js";

/* 목록 */
export async function listNotices() {
  return noticeModel.listBasic();
}

/* 상세 */
export async function getNotice(id) {
  const item = await noticeModel.getByIdWithAdj(id);
  const images = await imageModel.listByNoticeId(id);
  return { ...item, images };
}

/* 생성 + 이미지 업로드 */
export async function createWithImages({ payload, fileList }) {
  const { finalHtml, uploaded } = await uploadImagesAndReplaceInBody(
    payload,
    fileList
  );

  const notice = await noticeModel.insertOne({
    title: payload.title?.trim(),
    name: payload.name?.trim(),
    body: finalHtml,
  });

  if (uploaded.length) {
    const rows = uploaded.map((u, i) => ({
      notice_id: Number(notice.id),
      file_path: u.path,
      byte_size: u.size ?? null,
      mime_type: u.mime ?? null,
      sort_order: i,
    }));
    const { error } = await imageModel.insertMany(rows);
    if (error) throw error;
  }

  return { id: notice.id, body: finalHtml };
}

/* 수정 + 새 이미지 추가 업로드 (기존 매핑 유지) */
export async function updateWithImages(id, { payload, fileList }) {
  const { finalHtml, uploaded } = await uploadImagesAndReplaceInBody(
    payload,
    fileList
  );

  await noticeModel.updateOne(id, {
    title: payload.title?.trim(),
    name: payload.name?.trim(),
    body: finalHtml,
  });

  // 새로 올라온 파일 매핑 추가
  if (uploaded.length) {
    const exists = await imageModel.listByNoticeId(id);
    const baseOrder = exists.length;
    const rows = uploaded.map((u, i) => ({
      notice_id: id,
      file_path: u.path, // ← DB에는 항상 images/.. 경로 저장
      byte_size: u.size ?? null,
      mime_type: u.mime ?? null,
      sort_order: baseOrder + i,
    }));
    const { error } = await imageModel.insertMany(rows);
    if (error) throw error;
  }

  // ── 여기만 변경 ───────────────────────────────────────────
  // 1) 본문에서 사용 중인 이미지들의 "경로(images/...)" 집합 만들기
  const usedPaths = new Set(
    Array.from(finalHtml.matchAll(/https?:\/\/[^\s"')]+/g))
      .map((m) => toBucketPath(m[0])) // 공개 URL → images/.. 로 정규화
      .filter(Boolean)
  );

  // 2) DB에 있는 경로 중 본문에 더 이상 안 쓰이는 것만 추려서 삭제
  const existsNow = await imageModel.listByNoticeId(id); // [{file_path,...}]
  const removed = existsNow
    .map((r) => r.file_path) // images/..
    .filter((p) => !usedPaths.has(p));

  if (removed.length) {
    console.log("[notice.update] to remove:", removed);
    await imageModel.deleteByNoticeIdAndPaths(id, removed); // 매핑 삭제
    await removeFromNotices(removed); // 스토리지 삭제
  }
  // ──────────────────────────────────────────────────────────

  return { id, body: finalHtml };
}

//  삭제 (본문/매핑/스토리지 함께 정리)
export async function removeNotice(id) {
  // 1) 현재 연결된 이미지 경로 수집
  const imgs = await imageModel.listByNoticeId(id);
  const paths = imgs.map((i) => i.file_path);

  // 2) 매핑 삭제
  if (paths.length) {
    await imageModel.deleteByNoticeIdAndPaths(id, paths);
  }

  // 3) 본문(공지) 삭제
  await noticeModel.deleteOne(id);

  // 4) 스토리지 삭제 (경로 기준, 버킷: notices)
  if (paths.length) {
    await removeFromNotices(paths);
  }
}

/* -------------------- 공통: 이미지 업로드 + 본문 치환 -------------------- */
async function uploadImagesAndReplaceInBody(payload, fileList) {
  const files = Array.isArray(fileList) ? fileList : fileList ? [fileList] : [];
  const uploaded = [];

  for (const f of files) {
    const buf = await fs.readFile(f.filepath);
    if (buf.length > 10 * 1024 * 1024) throw new Error("파일 최대 10MB 초과");

    const webp = await toWebpResized(buf, { maxWidth: 1600, quality: 80 });

    // token: fieldName=img-xxxx 우선, 없으면 originalFilename 사용
    const token =
      typeof f.fieldName === "string" && f.fieldName.startsWith("img-")
        ? f.fieldName
        : f.originalFilename;

    const base = `${nowStamp()}_${sanitizeFilename(
      token || f.originalFilename
    )}.webp`;
    const storagePath = `images/${base}`;

    const { publicUrl } = await uploadBufferToNotices(
      storagePath,
      webp,
      "image/webp"
    );

    uploaded.push({
      token,
      path: storagePath,
      publicUrl,
      size: webp.length,
      mime: "image/webp",
    });
  }

  let finalHtml = payload.bodyHtmlWithBlobUrls || "";
  for (const meta of payload.images ?? []) {
    const hit = uploaded.find((u) => u.token === meta.token);
    if (hit && meta.blob)
      finalHtml = finalHtml.replaceAll(meta.blob, hit.publicUrl);
  }

  return { finalHtml, uploaded };
}
