import { sb } from "../config/db.js";

// list
export async function listBasic() {
  const { data, error } = await sb
    .from("notices")
    .select("id,title,name,created_at")
    .order("id", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

// detail + prev/next
export async function getByIdWithAdj(id) {
  const { data: cur, error: e1 } = await sb
    .from("notices")
    .select("id,title,name,body,created_at")
    .eq("id", id)
    .single();
  if (e1) throw e1;

  const { data: prev } = await sb
    .from("notices")
    .select("id,title")
    .lt("id", id)
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: next } = await sb
    .from("notices")
    .select("id,title")
    .gt("id", id)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  return { ...cur, prev: prev ?? null, next: next ?? null };
}

// create
export async function insertOne({ title, name, body }) {
  if (!title?.trim() || !name?.trim() || !body?.trim()) {
    throw new Error("필수값 누락");
  }
  const { data, error } = await sb
    .from("notices")
    .insert([{ title: title.trim(), name: name.trim(), body }])
    .select("id")
    .single();
  if (error) throw error;
  return data; // { id }
}

// update
export async function updateOne(id, { title, name, body }) {
  const fields = {};
  if (title?.trim()) fields.title = title.trim();
  if (name?.trim()) fields.name = name.trim();
  if (typeof body === "string") fields.body = body;
  if (!Object.keys(fields).length) return;

  const { error } = await sb.from("notices").update(fields).eq("id", id);
  if (error) throw error;
}
