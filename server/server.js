import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Render가 넘겨주는 포트 사용
const PORT = process.env.PORT || 8080;

// CORS (Vercel 도메인만 허용)
const ORIGIN = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.get("/", (_req, res) => {
  res.send("반갑다");
});

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
