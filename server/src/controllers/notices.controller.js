import { listNotices } from "../services/notices.service.js";

export const list = async (_req, res, next) => {
  try {
    const data = await listNotices();
    res.json(data);
  } catch (e) {
    next(e);
  }
};
