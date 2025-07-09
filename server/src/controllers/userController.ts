import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userId = decoded.userId;

    const { bio, skills, goals } = req.body;

    if (!bio && !skills && !goals) {
      return res.status(400).json({ message: "Please provide profile fields to update." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(bio && { bio }),
        ...(skills && { skills }),
        ...(goals && { goals }),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const getAllMentors = async (req: Request, res: Response) => {
  try {
    const mentors = await User.find({ role: "mentor" }).select("-password");
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mentors" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};


export const getUserProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load profile" });
  }
};
