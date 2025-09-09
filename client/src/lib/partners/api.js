// client/src/lib/partners/api.js
const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

// list
export async function listPartners(params = {}) {
  const qs = new URLSearchParams(params);
  const r = await fetch(`${API}/partners?${qs.toString()}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "목록 조회 실패");
  return j.data; // { rows, total }
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
