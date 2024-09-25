import jwt from "jsonwebtoken";
import createError from "../helpers/createError.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    if (!token) throw createError(401, "Not authenticated");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) throw createError(403, "Token invalid");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// user
// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user?.id) {
//       next();
//     } else {
//       next(createError(403, "Access denied, user privileges required"));
//     }
//   });
// };

// admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role === "R3") {
      next();
    } else {
      next(createError(403, "Access denied, admin privileges required"));
    }
  });
};

// monitor
export const verifyMonitor = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role === "R2" || req.user?.role === "R3") {
      next();
    } else {
      next(createError(403, "Access denied, consultant privileges required"));
    }
  });
};
