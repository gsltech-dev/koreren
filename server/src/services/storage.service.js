// src/services/storage.service.js
import { sb } from "../config/db.js";

const BUCKET = "notices";

/** public URL 또는 경로를 받아서 항상 "images/xxx.webp" 형태로 정규화 */
export function toBucketPath(x = "") {
  if (!x) return "";
  // 이미 경로형이면 그대로
  if (!/^https?:\/\//i.test(x)) return x.replace(/^\/+/, "");
  // URL이면 "/object/public/<bucket>/" 다음을 잘라서 경로만 추출
  const m = x.match(/\/object\/public\/([^/]+)\/(.+)$/);
  if (!m) return ""; // 매칭 실패 시 빈문자
  const [, bucket, path] = m;
  if (bucket !== BUCKET) return ""; // 다른 버킷이면 스킵
  return path;
}

/** Supabase Storage(notices 버킷)에서 여러 파일 삭제 */
export async function removeFromNotices(pathsOrUrls = []) {
  const paths = (pathsOrUrls || [])
    .map(toBucketPath)
    .filter((p) => p && typeof p === "string");

  if (!paths.length) {
    return;
  }

  const { data, error } = await sb.storage.from(BUCKET).remove(paths);

  if (error) throw error;
}

/** 버퍼 업로드 (기존 그대로) */
export async function uploadBufferToNotices(path, buffer, contentType) {
  const { error } = await sb.storage.from(BUCKET).upload(path, buffer, {
    contentType,
    upsert: false,
  });
  if (error) throw error;
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);

  return { path, publicUrl: data.publicUrl };
}
