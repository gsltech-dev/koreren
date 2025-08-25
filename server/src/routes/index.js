import { Router } from "express";
import notices from "./notices.routes.js";

const r = Router();
r.use("/notices", notices);
export default r;
