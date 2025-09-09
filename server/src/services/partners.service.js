// server/src/services/partners.service.js
import {
  partnersListValidate,
  partnersCreateValidate,
  partnersUpdateValidate,
  partnersDeleteValidate,
} from "../utils/validate/partners.validate.js";
import { pagination } from "../utils/pagination.js";
import { geocodeAddress } from "../utils/kakao.local.js";
import {
  partnersListModel,
  partnersCreateModel,
  partnersGetModel,
  partnersUpdateModel,
  partnersDeleteModel,
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

// detail
async function partnersGetService(id) {
  const row = await partnersGetModel(Number(id));
  return {
    ...row,
    phone: row.phone ? formatKoreanPhone(row.phone) : null,
    tag: row.tag?.trim() === "본사직영" ? "본사직영" : null,
  };
}

// update (PUT: 부분수정 허용)
async function partnersUpdateService(id, payload = {}) {
  const patch = partnersUpdateValidate(payload);

  // 주소/상세주소 변경 시 지오코딩해서 행정구역/좌표 갱신
  if ("address" in patch || "detail_address" in patch) {
    const addr = patch.address;
    const det = "detail_address" in patch ? patch.detail_address : undefined;

    if (addr && addr.trim()) {
      const { si_do, gu_gun, lat, lng } = await geocodeAddress(addr, det);
      if (!si_do) throw new Error("주소를 인식할 수 없습니다.");
      patch.si_do = si_do;
      patch.gu_gun = gu_gun || null;
      patch.lat = lat ?? null;
      patch.lng = lng ?? null;
    } else {
      // 주소가 비워지는 경우 좌표/행정구역도 정리
      patch.si_do = null;
      patch.gu_gun = null;
      patch.lat = null;
      patch.lng = null;
    }
  }

  const { id: updatedId } = await partnersUpdateModel(Number(id), patch);
  return { id: updatedId };
}

// delete
async function partnersDeleteService(params = {}) {
  const { id } = partnersDeleteValidate(params);
  const { id: deletedId } = await partnersDeleteModel(id);
  return { id: deletedId };
}

export {
  partnersListService,
  partnersCreateService,
  partnersGetService,
  partnersUpdateService,
  partnersDeleteService,
};
