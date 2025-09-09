// server/src/routes/partners.routes.js
import { Router } from "express";
import {
  partnersCreateController,
  partnersListController,
  partnersGetController,
  partnersUpdateController,
  partnersDeleteController,
} from "../controllers/partners.controller.js";

const r = Router();

// list
r.get("/", partnersListController);

// detail
r.get("/:id", partnersGetController);

// create
r.post("/create", partnersCreateController);

// update (부분수정 허용 PUT)
r.put("/:id", partnersUpdateController);

// delete
r.delete("/:id", partnersDeleteController);

export default r;
