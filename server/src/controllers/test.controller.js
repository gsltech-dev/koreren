import { Router } from "express";
import { sb } from "../config/db.js";

const r = Router();
const BUCKET = "notices";

// 헬스체크
r.get("/ping", (_req, res) => res.json({ ok: true, now: Date.now() }));

// 하드코딩 삭제 테스트
r.delete("/remove", async (_req, res) => {
  try {
    // 🔥 여기서 직접 삭제할 파일을 지정
    const list = ["images/1756280400635_img-puq04dfl1756280399631.webp"];

    console.log("[test.remove] hardcoded:", list);

    const { data, error } = await sb.storage.from(BUCKET).remove(list);
    console.log("[test.remove] result:", { data, error });

    if (error) return res.status(500).json({ ok: false, error });
    res.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default r;
