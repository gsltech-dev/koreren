const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";
import { sb } from "../supabase";

// // 공개: 목록
// export async function listPartners(params = {}) {
//   const qs = new URLSearchParams(params);
//   const r = await fetch(${API}/partners?${qs.toString()});
//   const j = await r.json().catch(() => ({}));
//   if (!r.ok || !j.ok) throw new Error(j.error?.message || "목록 조회 실패");
//   return j.data; // { rows, total, page, pageSize }
// }

// public:list (vercel direct connect supabase)
export async function listPartners(params = {}) {
  const {
    si_do = null,
    gu_gun = null,
    q = null,
    page = 1,
    pageSize = 3,
  } = params;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let qy = sb
    .from("partners")
    .select(
      "id,name,tag,si_do,gu_gun,address,detail_address,postal_code,phone,lat,lng,created_at",
      { count: "exact" }
    )
    .order("id", { ascending: false })
    .range(from, to);

  if (si_do) qy = qy.ilike("si_do", `${si_do}%`);
  if (gu_gun) qy = qy.ilike("gu_gun", `${gu_gun}%`);
  if (q) {
    const like = `%${q}%`;
    qy = qy.or(
      `name.ilike.${like},address.ilike.${like},detail_address.ilike.${like}`
    );
  }

  const { data, count, error } = await qy;
  if (error) throw error;

  const rows = (data ?? []).map((r) => ({
    ...r,
    phone: r.phone ? formatPhone(r.phone) : null,
    tag: r.tag?.trim() === "본사직영" ? "본사직영" : null,
  }));

  return { rows, total: count ?? 0, page, pageSize };
}

// public: detail
export async function getPartner(id) {
  const r = await fetch(`${API}/partners/${id}`);
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.ok) throw new Error(j?.error?.message || "상세 조회 실패");
  return j.data;
}

// private: create
export async function createPartner(payload) {
  const { apiFetch } = await import("../http");
  return apiFetch("/partners/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// private: update
export async function updatePartner(id, payload) {
  const { apiFetch } = await import("../http");
  return apiFetch(`/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// private: delete
export async function deletePartner(id) {
  const { apiFetch } = await import("../http");
  return apiFetch(`/partners/${id}`, { method: "DELETE" });
}

// 새로 추가함.
function formatPhone(s) {
  const t = String(s).replace(/\D/g, "");
  if (!t) return null;
  if (t.startsWith("02"))
    return t.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3");
  return t.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
}
