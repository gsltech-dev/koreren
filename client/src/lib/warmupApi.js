// client/src/lib/warmupApi.js
const API = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export function warmup(ms = 8000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  return fetch(`${API}/warmup?ts=${Date.now()}`, {
    method: "GET",
    cache: "no-store",
    signal: ac.signal,
  })
    .catch(() => {})
    .finally(() => clearTimeout(t));
}
