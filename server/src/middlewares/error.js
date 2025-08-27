export const notFound = (req, _res, next) => {
  const err = new Error(`Not Found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const body = { ok: false, error: { message: err.message || "Server Error" } };
  if (process.env.NODE_ENV !== "production") body.error.stack = err.stack;
  res.status(err.status || 500).json(body);
};
