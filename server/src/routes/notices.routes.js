import { Router } from "express";
import * as ctrl from "../controllers/notices.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const r = Router();
r.get("/", ctrl.list); //리스트
r.get("/:id", ctrl.detail); //상세
r.post("/", requireAuth, requireAdmin, ctrl.create); //생성
r.patch("/:id", requireAuth, requireAdmin, ctrl.update); //수정
r.delete("/:id", requireAuth, requireAdmin, ctrl.remove); //삭제
export default r;
