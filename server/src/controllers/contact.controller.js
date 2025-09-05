// src/controllers/contact.controller.js
import formidable from "formidable";
import fs from "node:fs/promises";
import { handleContact } from "../services/contact.service.js";

const first = (v) => (Array.isArray(v) ? v[0] : v);

export async function postContact(req, res, next) {
  try {
    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
      if (err) return next(err);

      // ← 모든 필드 1개 문자열로 정규화
      const type = first(fields.type);
      const name = first(fields.name);
      const phone = first(fields.phone);
      const email = first(fields.email);
      const title = first(fields.title);
      const body = first(fields.body);
      const agree = String(first(fields.agree));

      if (agree !== "true") {
        return res
          .status(400)
          .json({ ok: false, error: { message: "동의 필요" } });
      }

      const list = Object.values(files || {}).flat();
      const fileList = await Promise.all(
        (Array.isArray(list) ? list : []).map(async (f) => ({
          originalFilename: f.originalFilename,
          mimetype: f.mimetype,
          buffer: await fs.readFile(f.filepath),
        }))
      );

      await handleContact({
        type,
        name,
        phone,
        email,
        title,
        body,
        files: fileList,
      });
      res.json({ ok: true });
    });
  } catch (e) {
    next(e);
  }
}
