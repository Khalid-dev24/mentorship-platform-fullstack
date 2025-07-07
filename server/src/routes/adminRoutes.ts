// src/routes/adminRoutes.ts
import express from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import { getAllUsers } from "../controllers/userController";
import { getAllSessions } from "../controllers/adminController";
import { getFeedbackForSession } from "../controllers/feedbackController";

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.get("/sessions", protect, isAdmin, getAllSessions);
router.get("/feedback", protect, isAdmin, getFeedbackForSession);

export default router;
