"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMySessions = exports.bookSession = void 0;
const Session_1 = __importDefault(require("../models/Session"));
const bookSession = async (req, res) => {
    try {
        const { mentorId, date, time } = req.body;
        const session = await Session_1.default.create({
            mentor: mentorId,
            mentee: req.user._id,
            date,
            time
        });
        res.status(201).json(session);
    }
    catch (err) {
        console.error("Session Booking Error:", err);
        res.status(500).json({ message: "Failed to book session" });
    }
};
exports.bookSession = bookSession;
const getMySessions = async (req, res) => {
    try {
        const userId = req.user._id;
        const sessions = await Session_1.default.find({
            $or: [{ mentor: userId }, { mentee: userId }]
        })
            .populate("mentor", "name email")
            .populate("mentee", "name email");
        res.json(sessions);
    }
    catch (err) {
        console.error("Get Sessions Error:", err);
        res.status(500).json({ message: "Failed to get sessions" });
    }
};
exports.getMySessions = getMySessions;
