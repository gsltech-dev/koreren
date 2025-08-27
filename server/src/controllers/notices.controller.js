import * as svc from "../services/notices.service.js";
import { parseMultipart } from "../utils/multipart.js";

// list
export async function list(_req, res, next) {
  try {
    const data = await svc.listNotices();
    res.json({ ok: true, data });
  } catch (e) {
    next(e);
  }
}

// detail
export async function detail(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) throw new Error("invalid id");
    const data = await svc.getNotice(id);
    res.json({ ok: true, data });
  } catch (e) {
    next(e);
  }
}

// create
export async function create(req, res, next) {
  try {
    const { fields, files } = await parseMultipart(req);
    if (!fields?.payload) {
      const fNames = Object.keys(files || {});
      const fldNames = Object.keys(fields || {});
      throw new Error(
        `payload is required (fields: ${fldNames.join(
          ","
        )} | files: ${fNames.join(",")})`
      );
    }
    const payload = JSON.parse(fields.payload);
    const fileList = normalizeFilesObject(files); // 배열화
    const data = await svc.createWithImages({ payload, fileList });
    res.status(201).json({ ok: true, data });
  } catch (e) {
    next(e);
  }
}

// update
export async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) throw new Error("invalid id");
    const { fields, files } = await parseMultipart(req);
    if (!fields?.payload) throw new Error("payload required");
    const payload = JSON.parse(fields.payload);
    const fileList = Object.values(files || {}).flat();
    const data = await svc.updateWithImages(id, { payload, fileList });
    res.json({ ok: true, data });
  } catch (e) {
    next(e);
  }
}

function normalizeFilesObject(files) {
  if (!files) return [];
  const arr = Object.values(files).flat();
  return Array.isArray(arr) ? arr : [arr];
}
