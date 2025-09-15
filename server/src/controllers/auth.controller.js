// server/src/controllers/auth.controller.js
import { sb } from "../config/db.js";
import { ENV } from "../config/env.js";

function getBearer(req) {
  const auth = req.headers.authorization || "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : null;
}

export async function meController(req, res) {
  try {
    const token = getBearer(req);
    if (!token) {
      return res.json({ ok: true, data: { user: null, isAdmin: false } });
    }

    const { data, error } = await sb.auth.getUser(token);
    if (error || !data?.user) {
      return res.json({ ok: true, data: { user: null, isAdmin: false } });
    }

    const user = data.user;
    const isAdmin = ENV.ADMIN_EMAILS.includes(user.email);

    return res.json({
      ok: true,
      data: { user: { id: user.id, email: user.email }, isAdmin },
    });
  } catch {
    // 예외도 비로그인으로 처리
    return res.json({ ok: true, data: { user: null, isAdmin: false } });
  }
}
