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
import Session from "./models/Session.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__basedir = __dirname;

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
app.get("/test", async (req, res) => {
  res.status(200).send("test");
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
      socket.on("sendMessage", async ({ userId, message, senderId }) => {
        try {
          const room = await Session.findOneAndUpdate(
            { userId },
            { $push: { messages: { senderId, message } } },
            { new: true }
          );
          socket.broadcast.emit("receiveMessage", { userId, message, senderId });
        } catch (error) {
          console.error(error);
        }
        socket.on("disconnect", () => {
          console.log("User disconnected");
        });
      });
    });
  } catch (error) {
    console.log(`server Error: `, error.message);
  }
});
