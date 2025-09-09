// server/src/controllers/partners.controller.js
import {
  partnersListService,
  partnersCreateService,
} from "../services/partners.service.js";

// list
async function partnersListController(req, res) {
  try {
    const data = await partnersListService(req.query || {});
    res.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({ ok: false, error: { message: e.message || "조회 실패" } });
  }
}

// create
async function partnersCreateController(req, res) {
  try {
    const data = await partnersCreateService(req.body || {});
    res.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({ ok: false, error: { message: e.message || "등록 실패" } });
  }
}

export { partnersListController, partnersCreateController };
