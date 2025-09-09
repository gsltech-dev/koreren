const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

// 공개: 목록
export async function listPartners(params = {}) {
  const qs = new URLSearchParams(params);
  const r = await fetch(`${API}/partners?${qs.toString()}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j.error?.message || "목록 조회 실패");
  return j.data; // { rows, total, page, pageSize }
}

// 공개: 상세
export async function getPartner(id) {
  const r = await fetch(`${API}/partners/${id}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j?.error?.message || "상세 조회 실패");
  return j.data;
}

// 보호: 생성
export async function createPartner(payload) {
  const { apiFetch } = await import("../http");
  return apiFetch("/partners/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// 보호: 수정
export async function updatePartner(id, payload) {
  const { apiFetch } = await import("../http");
  return apiFetch(`/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// 보호: 삭제
export async function deletePartner(id) {
  const { apiFetch } = await import("../http");
  return apiFetch(`/partners/${id}`, { method: "DELETE" });
}
