import express from "express";
import * as ctrls from "../controllers/index.js";

const routes = express.Router();

routes.get("/", ctrls.getProducts);

export default routes;
