// server/src/utils/kakao.local.js
import { ENV } from "../config/env.js";

/** 카카오 Local REST로 주소 지오코딩 */
export async function geocodeAddress(address, detail = "") {
  const base = ENV.KAKAO_LOCAL_BASE || "https://dapi.kakao.com";
  const query = `${address} ${detail}`.trim();
  const url = `${base}/v2/local/search/address.json?query=${encodeURIComponent(
    query
  )}`;

  const r = await fetch(url, {
    headers: { Authorization: `KakaoAK ${ENV.KAKAO_REST_KEY}` },
  });
  if (!r.ok) throw new Error(`Kakao local error: ${r.status}`);

  const j = await r.json();
  const doc = j?.documents?.[0];
  if (!doc) {
    return { si_do: null, gu_gun: null, lat: null, lng: null };
  }

  const meta = doc.road_address || doc.address || {};
  const si_do = meta.region_1depth_name || null;
  const gu_gun = meta.region_2depth_name || null;
  const lat = doc.y != null ? parseFloat(doc.y) : null;
  const lng = doc.x != null ? parseFloat(doc.x) : null;

  return { si_do, gu_gun, lat, lng };
}
