import { sb } from "../config/db.js";

export const findAll = () =>
  sb.from("notices").select("*").order("created_at", { ascending: false });
