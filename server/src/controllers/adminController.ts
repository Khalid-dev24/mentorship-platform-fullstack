
import { Response } from "express";
import Session from "../models/Session";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getAllSessions = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await Session.find()
      .populate("mentor", "name")
      .populate("mentee", "name");

    res.json(sessions);
  } catch (err) {
    console.error("Admin Get Sessions Error:", err);
    res.status(500).json({ message: "Error fetching sessions" });
  }
};
