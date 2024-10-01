import express from "express";
import * as ctrls from "../controllers/index.js";
const routes = express.Router();
import { verifyMonitor, verifyToken } from "../middlewares/verifyToken.js";
routes.get("/room", verifyToken, ctrls.getRoomMessage);
routes.get("/rooms", verifyMonitor, ctrls.getRooms);
export default routes;
