import { Router } from "express";
import { sb } from "../config/db.js";

const r = Router();

// 초경량 DB 워밍업
r.get("/", async (_req, res) => {
  try {
    await sb
      .from("partners")
      .select("id", { head: true, count: "exact" })
      .limit(1);
  } catch (_) {}
  return res.status(204).end();
});

export default r;
