import express, { Request, Response, NextFunction } from "express";
import { protect, AuthRequest } from "../middlewares/authMiddleware";
import {
  leaveFeedback,
  getFeedbackForSession
} from "../controllers/feedbackController";

const router = express.Router();


router.post("/", (req: Request, res: Response, next: NextFunction) =>
  leaveFeedback(req as AuthRequest, res)
);

router.get("/:sessionId",  (req: Request, res: Response, next: NextFunction) =>
  getFeedbackForSession(req as AuthRequest, res)
);

export default router;
