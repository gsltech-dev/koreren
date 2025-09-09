// server/src/models/partners.model.js
import { sb } from "../config/db.js";

// list
async function partnersListModel({ si_do, gu_gun, q, from, to }) {
  let qy = sb
    .from("partners")
    .select(
      "id,name,tag,si_do,gu_gun,address,detail_address,postal_code,phone,lat,lng,created_at",
      { count: "exact" }
    )
    .order("id", { ascending: false })
    .range(from, to);

  // 접두 일치(서울% / 부산% 등). btree 인덱스 사용 가능
  if (si_do) qy = qy.ilike("si_do", `${si_do}%`);
  if (gu_gun) qy = qy.ilike("gu_gun", `${gu_gun}%`);

  if (q) {
    const like = `%${q}%`;
    qy = qy.or(
      `name.ilike.${like},address.ilike.${like},detail_address.ilike.${like}`
    );
  }

  const { data, count, error } = await qy;
  if (error) throw error;
  return { rows: data ?? [], total: count ?? 0 };
}

// create
async function partnersCreateModel(row) {
  // row: { name, tag, si_do, gu_gun, address, detail_address, postal_code, phone, lat, lng }
  const { data, error } = await sb
    .from("partners")
    .insert([row])
    .select("id")
    .single();

  if (error) throw error;
  return { id: data.id };
}

// detail
async function partnersGetModel(id) {
  const { data, error } = await sb
    .from("partners")
    .select(
      "id,name,tag,si_do,gu_gun,address,detail_address,postal_code,phone,lat,lng,created_at,updated_at"
    )
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// update (부분수정)
async function partnersUpdateModel(id, patch) {
  const { data, error } = await sb
    .from("partners")
    .update(patch)
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  return { id: data.id };
}

// delete
async function partnersDeleteModel(id) {
  // 삭제된 행의 id를 반환하도록 select 사용
  const { data, error } = await sb
    .from("partners")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) throw error;
  return { id: data.id };
}

export {
  partnersListModel,
  partnersCreateModel,
  partnersGetModel,
  partnersUpdateModel,
  partnersDeleteModel,
};
