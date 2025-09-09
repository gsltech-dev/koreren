// src/app.js
import express from "express";
import routes from "./routes/index.js";
import { httpLogger } from "./config/logger.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(httpLogger);

// 🔒 캐시 완전 비활성화
app.set("etag", false);
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/healthz", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) => res.send("OK"));

// ✅ 라우트 마운트
app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
