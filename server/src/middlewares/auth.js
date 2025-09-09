// server/src/middlewares/auth.js
import { sb } from "../config/db.js";
import { ENV } from "../config/env.js";

export async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token)
      return res
        .status(401)
        .json({ ok: false, error: { message: "Unauthorized" } });

    const { data, error } = await sb.auth.getUser(token);
    if (error || !data?.user) {
      return res
        .status(401)
        .json({ ok: false, error: { message: "Invalid token" } });
    }

    req.user = data.user;
    req.isAdmin = ENV.ADMIN_EMAILS.includes(data.user.email);
    next();
  } catch (e) {
    res.status(401).json({ ok: false, error: { message: "Auth failed" } });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user)
    return res
      .status(401)
      .json({ ok: false, error: { message: "Unauthorized" } });
  if (!req.isAdmin)
    return res.status(403).json({ ok: false, error: { message: "Forbidden" } });
  next();
}
