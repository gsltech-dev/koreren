// server/src/utils/validate/partners.validate.js

// create
function partnersCreateValidate(payload = {}) {
  const { name, tag, phone, postal_code, address, detail_address } = payload;

  if (!name?.trim()) throw new Error("매장명(name)은 필수입니다.");
  if (!address?.trim()) throw new Error("주소(address)는 필수입니다.");

  if (phone && !/^\d{7,15}$/.test(String(phone)))
    throw new Error("전화번호는 숫자만 7~15자리로 입력하세요.");
  if (postal_code && !/^\d{3,10}$/.test(String(postal_code)))
    throw new Error("우편번호 형식이 올바르지 않습니다.");

  if (name.length > 200) throw new Error("매장명이 너무 깁니다.");
  if (tag && tag.length > 50) throw new Error("분류(태그)가 너무 깁니다.");
  if (address.length > 500) throw new Error("주소가 너무 깁니다.");
  if (detail_address && detail_address.length > 500)
    throw new Error("상세주소가 너무 깁니다.");

  // si_do / gu_gun / lat / lng 는 서버 지오코딩으로 채움
  return {
    name: name.trim(),
    tag: tag?.trim() || null,
    address: address.trim(),
    detail_address: detail_address?.trim() || null,
    postal_code: postal_code?.trim() || null,
    phone: phone?.trim() || null,
  };
}

// list
function partnersListValidate(query = {}) {
  const { si_do = "", gu_gun = "", q = "", page = 1, pageSize = 20 } = query;

  const _si = String(si_do || "").trim();
  const _gu = String(gu_gun || "").trim();
  const _q = String(q || "").trim();

  if (_si.length > 50) throw new Error("시/도 값이 너무 깁니다.");
  if (_gu.length > 50) throw new Error("구/군 값이 너무 깁니다.");
  if (_q.length > 200) throw new Error("검색어가 너무 깁니다.");

  const p = Number.parseInt(page, 10);
  const s = Number.parseInt(pageSize, 10);

  return {
    si_do: _si || null,
    gu_gun: _gu || null,
    q: _q || null,
    page: Number.isFinite(p) && p > 0 ? p : 1,
    pageSize: Number.isFinite(s) && s > 0 ? Math.min(s, 100) : 20,
  };
}

export { partnersCreateValidate, partnersListValidate };
