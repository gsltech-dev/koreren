// src/lib/api.js
import { sb } from "../lib/supabase";

const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function createNoticeViaServer(payload) {
  const r = await fetch(`${API}/notices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "생성 실패");
  return j.data; // { id }
}

export async function updateNoticeViaServer(id, patch) {
  const r = await fetch(`${API}/notices/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "수정 실패");
  return j.data;
}

export async function deleteNoticeViaServer(id) {
  const r = await fetch(`${API}/notices/${id}`, { method: "DELETE" });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "삭제 실패");
}

// list: 페이지네이션 + 검색 (안전 가드 버전)
export async function getNotices({
  page = 1,
  pageSize = 10,
  q = "",
  field = "title", // title|body|name
  range = "all", // all|week|month|month3
} = {}) {
  // 1) 파라미터 정리/검증
  const p = Number.parseInt(page, 10);
  const sz = Number.parseInt(pageSize, 10);
  const safePage = Number.isFinite(p) && p > 0 ? p : 1;
  const safeSize = Number.isFinite(sz) && sz > 0 ? Math.min(sz, 100) : 10;

  const from = (safePage - 1) * safeSize;
  const to = from + safeSize - 1;

  // 2) 기본 쿼리
  let query = sb
    .from("notices")
    .select("id,title,name,created_at", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to);

  // 3) 검색(필드 화이트리스트)
  const allowed = new Set(["title", "body", "name"]);
  const col = allowed.has(field) ? field : "title";
  if (q?.trim()) {
    query = query.ilike(col, `%${q.trim()}%`);
  }

  // 4) 기간 필터
  if (range !== "all") {
    const d = new Date();
    if (range === "week") d.setDate(d.getDate() - 7);
    else if (range === "month") d.setMonth(d.getMonth() - 1);
    else if (range === "month3") d.setMonth(d.getMonth() - 3);

    const since = d.toISOString(); // 유효한 ISO 문자열
    query = query.gte("created_at", since);
  }

  // 5) 실행
  const { data, count, error } = await query;
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

// Detail
export async function getNotice(id) {
  const numId = Number(id);

  // 현재 글
  const { data: current, error } = await sb
    .from("notices")
    .select("id,title,name,body,created_at,updated_at")
    .eq("id", numId)
    .single();
  if (error) throw error;

  // 이전 글 (더 최신: 큰 id 중 가장 가까운 것)
  const { data: prev } = await sb
    .from("notices")
    .select("id,title")
    .gt("id", numId) // 현재보다 큰 id
    .order("id", { ascending: true }) // 가까운 큰 id
    .limit(1)
    .maybeSingle();

  // 다음 글 (더 과거: 작은 id 중 가장 가까운 것)
  const { data: next } = await sb
    .from("notices")
    .select("id,title")
    .lt("id", numId) // 현재보다 작은 id
    .order("id", { ascending: false }) // 가까운 작은 id
    .limit(1)
    .maybeSingle();

  return { ...current, prev, next };
}

// 글 생성
export async function createNotice({ title, name, body }) {
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

// 이미지 업로드
export async function uploadImageToStorage(file) {
  const safe = file.name.replace(/[^\w.\-]/g, "_");
  const path = `notice/${Date.now()}_${safe}`;
  const { data, error } = await sb.storage.from("notices").upload(path, file, {
    upsert: false,
    cacheControl: "3600",
    contentType: file.type,
  });
  if (error) throw error;

  const { data: pub, error: pubErr } = sb.storage
    .from("notices")
    .getPublicUrl(data.path);
  if (pubErr) throw pubErr;

  return pub.publicUrl; // https://.../object/public/notices/...
}

export async function createNoticeViaServerMultipart(formData) {
  const r = await fetch(`${API}/notices`, { method: "POST", body: formData });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "생성 실패");
  return j.data; // { id, body }
}

export async function updateNotice(id, formData) {
  const r = await fetch(`${API}/notices/${id}`, {
    method: "PATCH",
    body: formData,
  });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "수정 실패");
  return j.data; // { id, body }
}
