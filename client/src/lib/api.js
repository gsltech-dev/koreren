// src/lib/api.js
import { sb } from "../lib/supabase";

export async function getNotices() {
  const { data, error } = await sb
    .from("notices")
    .select("id, title, name, created_at")
    .order("id", { ascending: false })
    .limit(20);
  if (error) throw error;
  return data;
}
