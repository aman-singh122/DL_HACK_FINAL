import express from "express";
import reportController from "./report.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/monthly-report", authMiddleware, reportController);

export default router;
