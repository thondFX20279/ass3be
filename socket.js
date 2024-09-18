import { Server } from "socket.io";

let io;
const socketServer = {
  init: (sever) => {
    io = new Server(sever, { cors: { origin: "*" } });
    console.log("io connected");
    return io;
  },
  getIO: () => {
    if (!io) throw new Error("Io is not initialize");
    return io;
  },
};

export default socketServer;
