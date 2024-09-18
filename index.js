import express from "express";
import connectDB from "./database/configure.js";
import socketServer from "./socket.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import initialRoutes from "./routes/index.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__basedir = __dirname;
console.log("basedir: ", __basedir);

const app = express();
const PORT = process.env.PORT || 3002;

// middleware;
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__basedir, "images")));
// body;

// cookie;
app.use(cookiesParser());
app.get("/test", (req, res) => {
  res.status(200).send("fdafads");
});

initialRoutes(app);

connectDB(() => {
  try {
    const sever = app.listen(PORT, () => {
      console.log(`Sever is running at ${PORT}`);
    });
    const io = socketServer.init(sever);
    io.on("connection", (socket) => {
      console.log(`connected: ${socket}`);
    });
  } catch (error) {
    console.log(`server Error: `, error.message);
  }
});
