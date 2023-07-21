import express from "express";
import cors from "cors";

import dotenv from "dotenv";

import tasksRouter from "./src/routes/task.routes.js";
import authRouter from "./src/routes/auth.routes.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);

app.listen(5001, () => {
  console.log("Сервер запущен на порту 5001");
});