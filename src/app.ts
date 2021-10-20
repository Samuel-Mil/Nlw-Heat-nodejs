import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { routes } from "./routes";

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`User is connected in socket ${socket.id}`);
});

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ Error: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error!",
  });
});

export { serverHttp, io };
