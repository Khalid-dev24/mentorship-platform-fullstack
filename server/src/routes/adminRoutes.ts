import express from "express";
import { isAdmin, protect } from "../middlewares/authMiddleware";
import { getAllUsers } from "../controllers/userController";
import { getAllSessions } from "../controllers/adminController";
import { getFeedbackForSession } from "../controllers/feedbackController";

const router = express.Router();

router.get("/users", isAdmin, getAllUsers);
router.get("/sessions", isAdmin, getAllSessions);
router.get("/feedback", isAdmin, getFeedbackForSession);

export default router;
