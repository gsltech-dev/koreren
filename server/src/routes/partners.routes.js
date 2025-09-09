// server/src/routes/partners.routes.js
import { Router } from "express";
import {
  partnersCreateController,
  partnersListController,
  partnersGetController,
  partnersUpdateController,
  partnersDeleteController,
} from "../controllers/partners.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const r = Router();

// list
r.get("/", partnersListController);

// detail
r.get("/:id", partnersGetController);

// create
r.post("/create", requireAuth, requireAdmin, partnersCreateController);

// update (부분수정 허용 PUT)
r.put("/:id", requireAuth, requireAdmin, partnersUpdateController);

// delete
r.delete("/:id", requireAuth, requireAdmin, partnersDeleteController);

export default r;
