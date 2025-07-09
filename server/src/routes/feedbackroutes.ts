import express, { Request, Response, NextFunction } from "express";
import { protect, AuthRequest } from "../middlewares/authMiddleware";
import {
  leaveFeedback,
  getFeedbackForSession
} from "../controllers/feedbackController";

const router = express.Router();


router.post("/", (req: Request, res: Response) =>
  leaveFeedback(req, res)
);

router.get("/:sessionId", (req: Request, res: Response) =>
  getFeedbackForSession(req, res)
);

export default router;
