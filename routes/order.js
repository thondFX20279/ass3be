import express from "express";
import * as ctrls from "../controllers/index.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { body, validationResult } from "express-validator";
verifyToken;

const routes = express.Router();
routes.get("/", verifyToken, ctrls.getOrders);
routes.post(
  "/",
  verifyToken,
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("address").notEmpty().withMessage("Address is required"),
  ],
  (req, res, next) => {
    const results = validationResult(req);
    if (!results.isEmpty())
      return res.status(422).json({ success: false, message: "Validate input failed", errors: results.array() });
    next();
  },

  ctrls.createOrders
);
routes.get("/:orderId", verifyToken, ctrls.getOrder);
routes.get("/user/:userId", verifyToken, ctrls.getOrdersByUser);
export default routes;
