import { Router } from "express";
import { postContact } from "../controllers/contact.controller.js";

const r = Router();
r.post("/", postContact);

export default r;
