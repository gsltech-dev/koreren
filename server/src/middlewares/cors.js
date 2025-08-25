import cors from "cors";
import { ENV } from "../config/env.js";

export const corsMiddleware = cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (
      ENV.ALLOWED_ORIGIN.includes("*") ||
      ENV.ALLOWED_ORIGIN.includes(origin)
    ) {
      return cb(null, true);
    }
    cb(new Error("CORS not allowed"));
  },
});
