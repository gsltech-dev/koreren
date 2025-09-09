// 숫자만 남기기
export function normalizePhone(input = "") {
  return String(input).replace(/\D+/g, "");
}

// 한국 전화번호 포매팅
export function formatKoreanPhone(digits = "") {
  const n = String(digits).replace(/\D+/g, "");
  if (!n) return "";

  // 02(서울) 유선: 9 or 10자리
  if (n.startsWith("02")) {
    if (n.length === 10) return `02-${n.slice(2, 6)}-${n.slice(6)}`; // 02-xxxx-xxxx
    if (n.length === 9) return `02-${n.slice(2, 5)}-${n.slice(5)}`; // 02-xxx-xxxx
  }

  // 휴대폰 010/011/016/017/018/019
  if (/^01[0-9]/.test(n)) {
    if (n.length === 11)
      return `${n.slice(0, 3)}-${n.slice(3, 7)}-${n.slice(7)}`; // 010-xxxx-xxxx
    if (n.length === 10)
      return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`; // 011-xxx-xxxx
  }

  // 일반 지역번호 0XX (031, 061 등) 9~10자리 → 3-3-4 / 3-4-4
  if (/^0\d{2}/.test(n)) {
    if (n.length === 10)
      return `${n.slice(0, 3)}-${n.slice(3, 6)}-${n.slice(6)}`;
    if (n.length === 9)
      return `${n.slice(0, 3)}-${n.slice(3, 5)}-${n.slice(5)}`;
  }

  // 대표/특수번호(15xx/16xx/18xx 등) 8자리 → 4-4
  if (/^\d{8}$/.test(n)) return `${n.slice(0, 4)}-${n.slice(4)}`;

  // 그 외: 뒤에서 4자리 고정 분할 (안전망)
  if (n.length > 4) return `${n.slice(0, n.length - 4)}-${n.slice(-4)}`;
  return n;
}
