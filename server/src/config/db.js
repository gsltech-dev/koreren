import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env.js";

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const sb = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
console.log("[supabase]", {
  url: ENV.SUPABASE_URL,
  keyPrefix: ENV.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 12),
  keyLen: ENV.SUPABASE_SERVICE_ROLE_KEY?.length,
});
