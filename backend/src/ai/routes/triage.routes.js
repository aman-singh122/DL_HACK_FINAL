import express from "express";
import triageController from "../controllers/triage.controller.js";

const router = express.Router();

router.post("/triage", triageController);

export default router;
