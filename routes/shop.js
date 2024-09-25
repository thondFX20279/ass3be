// routes/shop.js
import express from "express";
import * as ctrls from "../controllers/index.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();
router.get("/cart", verifyToken, ctrls.getCart);
router.post("/cart/add", verifyToken, ctrls.addProductToCart);
router.delete("/cart/remove/:productId", verifyToken, ctrls.removeProductFromCart);
router.delete("/cart/clear", verifyToken, ctrls.clearUserCart);
router.put("/cart/increase/:productId", verifyToken, ctrls.increaseProductQuantity);
router.put("/cart/decrease/:productId", verifyToken, ctrls.decreaseProductQuantity);

export default router;
