export const notFound = (req, _res, next) => {
  const err = new Error(`Not Found: ${req.originalUrl}`);
  err.status = 404;
  next(err);
};

export const errorHandler = (err, _req, res, _next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
};
