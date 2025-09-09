// server/src/controllers/auth.controller.js
export async function meController(req, res) {
  res.json({
    ok: true,
    data: {
      user: { id: req.user.id, email: req.user.email },
      isAdmin: req.isAdmin,
    },
  });
}
