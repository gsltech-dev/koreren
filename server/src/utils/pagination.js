// server/src/utils/pagination.js
export function pagination(page = 1, pageSize = 20, maxSize = 100) {
  const p = Number.parseInt(page, 10); // 클라에서 온 page 값 숫자로 변환
  const s = Number.parseInt(pageSize, 10); // 클라에서 온 pageSize 값 숫자로 변환
  const safePage = Number.isFinite(p) && p > 0 ? p : 1;
  const safeSize = Number.isFinite(s) && s > 0 ? Math.min(s, maxSize) : 20;
  // pageSize가 양수라면 그대로 쓰되, maxSize(100)를 넘지 못하게 제한
  // 값이 없거나 이상하면 기본 20
  const from = (safePage - 1) * safeSize;
  const to = from + safeSize - 1;

  return { page: safePage, pageSize: safeSize, from, to };
}
