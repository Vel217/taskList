import { Router } from "express";
import { SessionGet } from "../services/auth.service.js";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/tasks.service.js";

const tasksRouter = Router();

tasksRouter.post("/task", async (req, res) => {
  try {
    const { name, email, text } = req.body;
    const task = { name, email, text };

    const newTask = await createTask(task);
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании задачи" });
  }
});

tasksRouter.get("/task", async (req, res) => {
  try {
    const { pageNumber, sortBy, sortDirection } = req.query;
    const params = { pageNumber, sortBy, sortDirection };
    const tasks = await getTasks(params);

    res.json(tasks);
  } catch (error) {
    console.error("Ошибка при получении списка задач:", error);
    res.status(500).json({ error: "Ошибка при получении списка задач" });
  }
});
tasksRouter.put("/task", async (req, res) => {
  try {
    const { text, status, id, userId } = req.body;
    const taskFields = { text, status, id };
    const authSession = await SessionGet(userId);

    if (authSession.session) {
      const task = await updateTask(taskFields);

      res.status(200).json(task);
    } else {
      return res.status(403).json({ message: "notAuthenticate" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении задачи" });
  }
});
tasksRouter.delete("/task", async (req, res) => {
  try {
    const { taskId, userId } = req.query;

    const authSession = await SessionGet(+userId);

    if (authSession.session) {
      const task = await deleteTask(+taskId);

      res.sendStatus(200);
    } else {
      return res.status(403).json({ message: "notAuthenticate" });
    }
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    res.status(500).json({ error: "Ошибка при удалении задачи" });
  }
});

export default tasksRouter;
