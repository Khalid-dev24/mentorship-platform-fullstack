import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { leaveFeedback, getFeedbackForSession } from "../controllers/feedbackController";

const router = express.Router();

router.post("/", protect, leaveFeedback);
router.get("/:sessionId", protect, getFeedbackForSession);

export default router;
