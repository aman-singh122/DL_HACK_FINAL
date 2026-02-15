import express from "express";
import { runChatAI } from "./chat.service.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { message } = req.body;

  const reply = await runChatAI({
    userId: req.user._id,
    message,
  });

  res.json({ success: true, reply });
});

export default router;
