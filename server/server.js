import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// Render가 넘겨주는 포트 사용
const PORT = process.env.PORT || 8080;

// CORS (Vercel 도메인만 허용)
const ORIGIN = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));

// ✅ Supabase 연결
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Health Check
app.get("/healthz", (_req, res) => res.json({ ok: true }));

// 기본 라우트
app.get("/", (_req, res) => {
  res.send("반갑다");
});

// ✅ DB 연결 테스트용 라우트
app.get("/test-db", async (_req, res) => {
  const { data, error } = await supabase.from("users").select("*").limit(1); // ⚠️ 테이블명 바꿔줘야 함
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
