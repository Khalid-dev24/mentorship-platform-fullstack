import { Request, Response } from "express";
import Session from "../models/Session";

export const bookSession = async (req: any, res: Response) => {
  try {
    const { mentorId, date, time } = req.body;

    const session = await Session.create({
      mentor: mentorId,
      mentee: req.user._id,
      date,
      time
    });

    res.status(201).json(session);
  } catch (err) {
    console.error("Session Booking Error:", err);
    res.status(500).json({ message: "Failed to book session" });
  }
};

export const getMySessions = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;

    const sessions = await Session.find({
      $or: [{ mentor: userId }, { mentee: userId }]
    })
      .populate("mentor", "name email")
      .populate("mentee", "name email");

    res.json(sessions);
  } catch (err) {
    console.error("Get Sessions Error:", err);
    res.status(500).json({ message: "Failed to get sessions" });
  }
};
