import express from "express";
import * as ctrls from "../controllers/index.js";

const routes = express.Router();

routes.get("/", ctrls.getProducts);
routes.get("/categories", ctrls.getCategories);
routes.get("/topTrending", ctrls.getTopTrending);
routes.get("/:productId", ctrls.getProductById);
routes.get("/related/:productId", ctrls.getRelatedProduct);

export default routes;
