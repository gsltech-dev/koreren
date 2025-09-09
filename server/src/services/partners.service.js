// server/src/services/partners.service.js
import {
  partnersListValidate,
  partnersCreateValidate,
} from "../utils/validate/partners.validate.js";
import { pagination } from "../utils/pagination.js";
import { geocodeAddress } from "../utils/kakao.local.js";
import {
  partnersListModel,
  partnersCreateModel,
} from "../models/partners.model.js";
import { formatKoreanPhone } from "../utils/phone.js";

// list
async function partnersListService(query = {}) {
  const v = partnersListValidate(query);
  const { from, to } = pagination(v.page, v.pageSize);

  const { rows, total } = await partnersListModel({
    si_do: v.si_do,
    gu_gun: v.gu_gun,
    q: v.q,
    from,
    to,
  });

  // 화면용 포맷 적용
  const shaped = rows.map((r) => ({
    ...r,
    phone: r.phone ? formatKoreanPhone(r.phone) : null,
    tag: r.tag?.trim() === "본사직영" ? "본사직영" : null,
  }));

  return { rows: shaped, total, page: v.page, pageSize: v.pageSize };
}

// create
async function partnersCreateService(payload = {}) {
  const base = partnersCreateValidate(payload);

  const { si_do, gu_gun, lat, lng } = await geocodeAddress(
    base.address,
    base.detail_address
  );
  if (!si_do)
    throw new Error("주소를 인식할 수 없습니다. 다른 주소로 시도해주세요.");

  const row = {
    ...base,
    si_do,
    gu_gun: gu_gun || null,
    lat: lat ?? null,
    lng: lng ?? null,
  };

  const { id } = await partnersCreateModel(row);
  return { id };
}

export { partnersListService, partnersCreateService };
