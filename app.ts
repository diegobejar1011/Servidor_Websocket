import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { dataHandler } from "./src/handlers/data_handler";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  pingInterval: 1000,
  pingTimeout: 2000,
});

io.use((socket, next)=> {
  console.log(socket.handshake);
  next();
})

io.on("connection", (socket: Socket) => {
  console.log("Cliente conectado");

  dataHandler(io, socket);
});

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});