import { Router } from "express";
import * as ctrl from "../controllers/notices.controller.js";

const r = Router();
r.get("/", ctrl.list); //리스트
r.get("/:id", ctrl.detail); //상세
r.post("/", ctrl.create); //생성
r.patch("/:id", ctrl.update); //수정
r.delete("/:id", ctrl.remove); //삭제
export default r;
