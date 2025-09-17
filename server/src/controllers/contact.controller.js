// src/controllers/contact.controller.js
import formidable from "formidable";
import fs from "node:fs/promises";
import { handleContact } from "../services/contact.service.js";

const first = (v) => (Array.isArray(v) ? v[0] : v);

// 허용 규칙
const ALLOW_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/zip",
]);
const MAX_PER_FILE = 10 * 1024 * 1024; // 10MB

export async function postContact(req, res, next) {
  try {
    const form = formidable({ multiples: true, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return next(err);

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

      // 파일 정규화
      const rawList = Object.values(files || {})
        .flat()
        .filter(Boolean);

      // 서버측 검증 (MIME + 크기)
      for (const f of rawList) {
        const typeOk = ALLOW_TYPES.has(String(f.mimetype || "").toLowerCase());
        const sizeOk = Number(f.size || 0) <= MAX_PER_FILE;
        if (!typeOk || !sizeOk) {
          return res.status(400).json({
            ok: false,
            error: {
              message:
                "허용 파일: JPG, JPEG, PNG, ZIP. 파일당 최대 10MB만 업로드 가능합니다.",
            },
          });
        }
      }

      const fileList = await Promise.all(
        rawList.map(async (f) => ({
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
