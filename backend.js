import express from "express";
import cors from "cors";
import * as url from "url";
import path from "path";
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
app.use(express.static("./build"));

app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "./build" });
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(url.fileURLToPath(import.meta.url), "./build/index.html")
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на порту ${process.env.PORT}`);
});

export default app;
