import { Request, Response, NextFunction } from "express";
import Feedback from "../models/Feedback";

interface AuthRequest extends Request {
  user?: { userId: string };
}

export const leaveFeedback = async (req: AuthRequest, res: Response) => {
  const { sessionId, rating, comment } = req.body;

  try {
    const feedback = await Feedback.create({
      session: sessionId,
      givenBy: req.user?.userId,
      rating,
      comment
    });

    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

export const getFeedbackForSession = async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;

  try {
    const feedback = await Feedback.find({ session: sessionId }).populate("givenBy", "name role");
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};
