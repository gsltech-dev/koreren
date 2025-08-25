import { Router } from "express";
import { list } from "../controllers/notices.controller.js";

const r = Router();
r.get("/", list); // READ only
export default r;
