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

app.get("/healthz", (_req, res) => res.json({ ok: true }));
app.get("/", (_req, res) => res.send("OK"));

// ✅ 라우트 마운트
app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
