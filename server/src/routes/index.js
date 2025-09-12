import { Router } from "express";
import warmup from "./warmup.routes.js";
import notices from "./notices.routes.js";
import contact from "./contact.routes.js";
import partners from "./partners.routes.js";
import auth from "./auth.routes.js";

import testController from "../controllers/test.controller.js";

const r = Router();
r.use("/warmup", warmup);
r.use("/notices", notices);
r.use("/contact", contact);
r.use("/partners", partners);
r.use("/auth", auth);
r.use("/test", testController); // ← 이제 /test 로 고정
console.log("[routes] mount /test");

export default r;
