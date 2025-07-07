"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getAllUsers = exports.getAllMentors = exports.updateProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const updateProfile = async (req, res) => {
    try {
        const { bio, skills, goals } = req.body;
        if (!bio && !skills && !goals) {
            return res.status(400).json({ message: "Please provide profile fields to update." });
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(req.user._id, {
            ...(bio && { bio }),
            ...(skills && { skills }),
            ...(goals && { goals }),
        }, { new: true }).select("-password");
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Profile updated", user: updatedUser });
    }
    catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({ message: "Failed to update user profile" });
    }
};
exports.updateProfile = updateProfile;
const getAllMentors = async (req, res) => {
    try {
        const mentors = await User_1.default.find({ role: "mentor" }).select("-password");
        res.json(mentors);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch mentors" });
    }
};
exports.getAllMentors = getAllMentors;
const getAllUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().select("-password");
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
};
exports.getAllUsers = getAllUsers;
const getUserProfile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user._id).select("-password");
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to load profile" });
    }
};
exports.getUserProfile = getUserProfile;
