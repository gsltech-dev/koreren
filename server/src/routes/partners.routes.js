// server/src/routes/partners.routes.js
import { Router } from "express";
import {
  partnersCreateController,
  partnersListController,
} from "../controllers/partners.controller.js";

const r = Router();

// list
r.get("/", partnersListController);

// create
r.post("/create", partnersCreateController);

export default r;
