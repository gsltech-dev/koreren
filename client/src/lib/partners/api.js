// client/src/lib/partners/api.js
const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

// list
export async function listPartners(params = {}) {
  const qs = new URLSearchParams(params);
  const r = await fetch(`${API}/partners?${qs.toString()}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "목록 조회 실패");
  return j.data; // { rows, total, page, pageSize }
}

// create
export async function createPartner(payload) {
  const r = await fetch(`${API}/partners/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "등록 실패");
  return j.data; // { id }
}

// detail
export async function getPartner(id) {
  const r = await fetch(`${API}/partners/${id}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j?.error?.message || "상세 조회 실패");
  return j.data;
}

// update (PUT)
export async function updatePartner(id, payload) {
  const r = await fetch(`${API}/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j?.error?.message || "수정 실패");
  return j.data; // { id }
}

// delete
export async function deletePartner(id) {
  const r = await fetch(`${API}/partners/${id}`, { method: "DELETE" });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "삭제 실패");
  return j.data; // { id }
}
