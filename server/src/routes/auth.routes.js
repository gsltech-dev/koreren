// server/src/routes/auth.routes.js
import { Router } from "express";
import { meController } from "../controllers/auth.controller.js";

const r = Router();
r.get("/me", meController);
export default r;
