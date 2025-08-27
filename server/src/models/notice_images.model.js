import { sb } from "../config/db.js";

// 다건 추가
export async function insertMany(rows) {
  const { data, error } = await sb
    .from("notice_images")
    .insert(rows)
    .select("id");
  return { data, error };
}

// 공지별 이미지 목록
export async function listByNoticeId(notice_id) {
  const { data, error } = await sb
    .from("notice_images")
    .select("id,file_path,byte_size,mime_type,sort_order")
    .eq("notice_id", notice_id)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function deleteByNoticeIdAndPaths(notice_id, paths = []) {
  if (!paths.length) return;
  const { error } = await sb
    .from("notice_images")
    .delete()
    .eq("notice_id", notice_id)
    .in("file_path", paths);
  if (error) throw error;
}
