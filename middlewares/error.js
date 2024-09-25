import createError from "../helpers/createError.js";

export const notFound = (req, res, next) => {
  next(createError(400, "Page not found"));
};

export const handleError = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server Error";
  console.log(err);

  return res.status(status).send({
    message,
    success: false,
    status,
    stack: err.stack,
  });
};
