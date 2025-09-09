import { sb } from "../supabase";

// 로그인 (이메일/비번)
export async function login(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data; // session 포함
}

// 로그아웃
export async function logout() {
  const { error } = await sb.auth.signOut();
  if (error) throw error;
}

// 현재 유저 프로필 (/auth/me)
export async function fetchMe() {
  const { apiFetch } = await import("../http");
  return apiFetch("/auth/me"); // 서버에서 requireAuth + requireAdmin 후 ok면 관리자
}

// 세션 구독 (옵션)
export function onAuthStateChange(cb) {
  const { data: sub } = sb.auth.onAuthStateChange((_event, session) =>
    cb(session)
  );
  return () => sub.subscription.unsubscribe();
}
