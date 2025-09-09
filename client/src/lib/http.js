// 공용 fetch 헬퍼: Supabase 토큰이 있으면 Authorization 자동 첨부
const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function apiFetch(path, options = {}) {
  // supabase client는 이미 src/lib/supabase.js 에 있다고 하셨죠!
  const { sb } = await import("./supabase");

  // 현재 세션에서 access_token 얻기
  const { data } = await sb.auth.getSession();
  const token = data.session?.access_token || null;

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API}${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) {
    throw new Error(json?.error?.message || "요청 실패");
  }
  return json.data; // { ... } 형태 통일
}
