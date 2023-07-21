import { Router } from "express";
import {
  SessionCreate,
  SessionGet,
  SessionUpdate,
  login,
} from "../services/auth.service.js";

const authRouter = Router();

authRouter.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body;

    const loginFields = { username, password };
    const admin = await login(loginFields);

    if (admin) {
      const activeSession = await SessionGet(admin.id);
     
      if (activeSession === null) {
        const newSession = await SessionCreate(admin.id);
        return res.json(newSession);
      } else if (activeSession.session) {
        return res.json(activeSession);
      } else {
        const update = await SessionUpdate(admin.id);
        const updateData = { session: update.session, userId: update.userId };

        return res.json(updateData);
      }
    } else {
      return res.status(404).json({ error: "Неправильные учетные данные" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании сессии" });
  }
});
authRouter.patch("/auth", async (req, res) => {
  try {
    const userId = req.body.userId;
    await SessionUpdate(userId);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

authRouter.get("/auth", async (req, res) => {
  try {
    const { userId } = req.query;

    const authSession = await SessionGet(userId);

    if (authSession.session) {
      return res.status(200).json(authSession);
    } else {
      return res.status(403).json({ message: "notAuthenticate" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default authRouter;
