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
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
  pingInterval: 1000,
  pingTimeout: 2000,
});

httpServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});

io.use((socket, next)=> {
    next();
})

io.on("connection", (socket: Socket) => {
  console.log("Cliente conectado");

  dataHandler(io, socket);
});
