// client/src/lib/api.js
const BASE = import.meta.env.VITE_API_BASE; // 예: https://koreren-server.onrender.com

export async function getNotices() {
  const res = await fetch(`${BASE}/notices`);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}
