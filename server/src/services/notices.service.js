// src/services/notices.service.js
import fs from "node:fs/promises";
import { toWebpResized } from "../utils/image-process.js";
import { sanitizeFilename, nowStamp } from "../utils/path-helpers.js";
import * as noticeModel from "../models/notices.model.js";
import * as imageModel from "../models/notice_images.model.js";
import { uploadBufferToNotices } from "./storage.service.js";
import { removeFromNotices } from "./storage.service.js";

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

  if (uploaded.length) {
    const exists = await imageModel.listByNoticeId(id);
    const baseOrder = exists.length;
    const rows = uploaded.map((u, i) => ({
      notice_id: id,
      file_path: u.path,
      byte_size: u.size ?? null,
      mime_type: u.mime ?? null,
      sort_order: baseOrder + i,
    }));
    const { error } = await imageModel.insertMany(rows);
    if (error) throw error;
  }

  // 본문에 더 이상 안 쓰이는 파일 경로들
  const existsNow = await imageModel.listByNoticeId(id);
  const removed = existsNow
    .filter((row) => !finalHtml.includes(row.file_path))
    .map((row) => row.file_path);

  if (removed.length) {
    console.log("[notice.update] to remove:", removed);
    await imageModel.deleteByNoticeIdAndPaths(id, removed);
    await removeFromNotices(removed); // 여기 주석 해제
  }

  return { id, body: finalHtml };
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
