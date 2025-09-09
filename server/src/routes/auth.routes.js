// server/src/routes/auth.routes.js
import { Router } from "express";
import { meController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const r = Router();
r.get("/me", requireAuth, meController);
export default r;
