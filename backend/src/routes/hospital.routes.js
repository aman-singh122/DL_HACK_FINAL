import express from "express";
import {
  createHospital,
  getAllHospitals,
  getHospitalById,
  getMyHospitalProfile,
  assignHospitalAdmin,
  getHospitalPatients,   // ✅ ADD
  getHospitalDoctors    // ✅ ADD
} from "../controllers/hospital.controller.js";


import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

const router = express.Router();

/* ================= HOSPITAL SELF PROFILE ============ */
/* 🔥 MUST BE ABOVE "/:id" */
router.get(
  "/me",
  authMiddleware,
  roleMiddleware("HOSPITAL"), // ✅ UPPERCASE
  getMyHospitalProfile
);

/* ================= ASSIGN EXISTING HOSPITAL ================= */
/* 🔗 Link logged-in hospital admin to existing hospital */
router.patch(
  "/assign-admin",
  authMiddleware,
  roleMiddleware("HOSPITAL"), // ✅ UPPERCASE
  assignHospitalAdmin
);

/* ================= CREATE HOSPITAL ================= */
/* Optional – keep for future */
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("ADMIN", "HOSPITAL"),
  createHospital
);


/* ================= GET ALL HOSPITALS ================= */
router.get("/", getAllHospitals);

/* ================= HOSPITAL PATIENTS ================= */
router.get(
  "/patients",
  authMiddleware,
  roleMiddleware("HOSPITAL"),
  getHospitalPatients
);

/* ================= HOSPITAL DOCTORS ================= */
router.get(
  "/doctors",
  authMiddleware,
  roleMiddleware("HOSPITAL"),
  getHospitalDoctors
);



/* ================= GET SINGLE HOSPITAL ================= */
router.get("/:id", getHospitalById);

export default router;
