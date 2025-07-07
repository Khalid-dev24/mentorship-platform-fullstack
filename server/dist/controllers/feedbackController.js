"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbackForSession = exports.leaveFeedback = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const leaveFeedback = async (req, res) => {
    var _a;
    const { sessionId, rating, comment } = req.body;
    try {
        const feedback = await Feedback_1.default.create({
            session: sessionId,
            givenBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
            rating,
            comment
        });
        res.status(201).json({ message: "Feedback submitted", feedback });
    }
    catch (err) {
        console.error("Feedback error:", err);
        res.status(500).json({ message: "Failed to submit feedback" });
    }
};
exports.leaveFeedback = leaveFeedback;
const getFeedbackForSession = async (req, res) => {
    const sessionId = req.params.sessionId;
    try {
        const feedback = await Feedback_1.default.find({ session: sessionId }).populate("givenBy", "name role");
        res.json(feedback);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching feedback" });
    }
};
exports.getFeedbackForSession = getFeedbackForSession;
