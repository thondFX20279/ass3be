import express from "express";
import * as ctrls from "../controllers/index.js";
import { verifyAdmin } from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";
const routes = express.Router();

routes.get("/", ctrls.getProducts);
routes.post("/", verifyAdmin, upload, ctrls.createProduct);
routes.delete("/:productId", verifyAdmin, ctrls.deleteProduct);
routes.get("/categories", ctrls.getCategories);
routes.get("/topTrending", ctrls.getTopTrending);
routes.get("/:productId", ctrls.getProductById);
routes.get("/related/:productId", ctrls.getRelatedProduct);

export default routes;
