import express from "express";
import triageController from "../controllers/triage.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import AITriage from "../../models/AITriage.js";

const router = express.Router();

// ✅ PROTECT POST ALSO
router.post("/triage", authMiddleware, triageController);

router.get("/history", authMiddleware, async (req, res) => {
  const history = await AITriage.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json({ success: true, data: history });
});

export default router;
