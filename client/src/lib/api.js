const BASE = import.meta.env.VITE_API_BASE;

export async function getNotices() {
  const res = await fetch(`${BASE}/notices`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${text}`);
  }
  return res.json();
}
