import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createClient } from "@supabase/supabase-js";

const {
  PORT = 8080,
  ALLOWED_ORIGIN = "*",
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env;

// 디버그: 실제로 로드됐는지 확인
console.log("ENV check:", {
  SUPABASE_URL,
  SERVICE_KEY_LEN: SUPABASE_SERVICE_ROLE_KEY?.length,
});

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/healthz", (_req, res) => {
  res.status(200).type("text").send("ok");
});

app.get("/", (_req, res) => {
  res.send("반갑다");
});

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});

console.log(
  "ENV check",
  !!process.env.SUPABASE_URL,
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);
app.get("/test-db", async (_req, res) => {
  const { data, error } = await supabase
    .from("YOUR_TABLE")
    .select("*")
    .limit(1);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/notices", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notices" });
  }
});
