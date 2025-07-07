"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequestStatus = exports.getReceivedRequests = exports.getSentRequests = exports.sendRequest = void 0;
const request_1 = __importDefault(require("../models/request"));
const sendRequest = async (req, res) => {
    const { mentorId } = req.body;
    console.log("REQ.BODY:", req.body);
    console.log("REQ.USER:", req.user);
    try {
        const existing = await request_1.default.findOne({
            mentee: req.user._id,
            mentor: mentorId,
            status: "PENDING",
        });
        console.log("Existing request found?", existing);
        if (existing) {
            return res.status(400).json({ message: "Request already sent and pending" });
        }
        const newRequest = await request_1.default.create({
            mentee: req.user._id,
            mentor: mentorId,
        });
        console.log("Request created:", newRequest);
        res.status(201).json(newRequest);
    }
    catch (err) {
        console.error("Send Request Error:", err.message);
        res.status(500).json({ message: "Error sending mentorship request" });
    }
};
exports.sendRequest = sendRequest;
const getSentRequests = async (req, res) => {
    const menteeId = req.user._id;
    try {
        const requests = await request_1.default.find({ mentee: menteeId }).populate("mentor", "-password");
        res.json(requests);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching sent requests" });
    }
};
exports.getSentRequests = getSentRequests;
const getReceivedRequests = async (req, res) => {
    const mentorId = req.user._id;
    try {
        const requests = await request_1.default.find({ mentor: mentorId }).populate("mentee", "-password");
        res.json(requests);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching received requests" });
    }
};
exports.getReceivedRequests = getReceivedRequests;
const updateRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const request = await request_1.default.findByIdAndUpdate(id, { status }, { new: true });
        if (!request)
            return res.status(404).json({ message: "Request not found" });
        res.json(request);
    }
    catch (err) {
        res.status(500).json({ message: "Error updating request" });
    }
};
exports.updateRequestStatus = updateRequestStatus;
