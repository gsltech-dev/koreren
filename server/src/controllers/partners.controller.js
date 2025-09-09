// server/src/controllers/partners.controller.js
import {
  partnersListService,
  partnersCreateService,
  partnersGetService,
  partnersUpdateService,
  partnersDeleteService,
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

// detail
async function partnersGetController(req, res) {
  try {
    const data = await partnersGetService(req.params.id);
    res.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    res
      .status(404)
      .json({ ok: false, error: { message: e.message || "조회 실패" } });
  }
}

// update
async function partnersUpdateController(req, res) {
  try {
    const data = await partnersUpdateService(req.params.id, req.body || {});
    res.json({ ok: true, data });
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({ ok: false, error: { message: e.message || "수정 실패" } });
  }
}

// delete
async function partnersDeleteController(req, res) {
  try {
    const data = await partnersDeleteService(req.params || {});
    res.json({ ok: true, data }); // { id }
  } catch (e) {
    console.error(e);
    res
      .status(400)
      .json({ ok: false, error: { message: e.message || "삭제 실패" } });
  }
}

export {
  partnersListController,
  partnersCreateController,
  partnersGetController,
  partnersUpdateController,
  partnersDeleteController,
};
