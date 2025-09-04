import cors from "cors";
import { ENV } from "../config/env.js";

export const corsMiddleware = cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // 서버-서버 호출이나 curl
    if (ENV.CORS_ORIGINS.includes("*") || ENV.CORS_ORIGINS.includes(origin)) {
      return cb(null, true);
    }
    cb(new Error("CORS not allowed"));
  },
  credentials: true,
});
