import { Request, Response } from "express";
import User from "../models/User";


export const updateProfile = async (req: any, res: Response) => {
  try {
    const { bio, skills, goals } = req.body;

    if (!bio && !skills && !goals) {
      return res.status(400).json({ message: "Please provide profile fields to update." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
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
    res.status(500).json({ message: "Failed to update user profile" });
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
