"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSessions = void 0;
const Session_1 = __importDefault(require("../models/Session"));
const getAllSessions = async (req, res) => {
    try {
        const sessions = await Session_1.default.find()
            .populate("mentor", "name")
            .populate("mentee", "name");
        res.json(sessions);
    }
    catch (err) {
        console.error("Admin Get Sessions Error:", err);
        res.status(500).json({ message: "Error fetching sessions" });
    }
};
exports.getAllSessions = getAllSessions;
