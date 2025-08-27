import { sb } from "../config/db.js";

/** Supabase Storage(notices 버킷) 업로드 후 publicUrl 반환 */
export async function uploadBufferToNotices(path, buffer, contentType) {
  const { error } = await sb.storage.from("notices").upload(path, buffer, {
    contentType,
    upsert: false,
  });
  if (error) throw error;
  const { data } = sb.storage.from("notices").getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}
