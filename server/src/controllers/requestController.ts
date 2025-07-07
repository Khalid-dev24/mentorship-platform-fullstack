import { Request, Response } from "express";
import RequestModel from "../models/request";

export const sendRequest = async (req: any, res: Response) => {
  const { mentorId } = req.body;

  console.log("REQ.BODY:", req.body);
  console.log("REQ.USER:", req.user);

  try {
    const existing = await RequestModel.findOne({
      mentee: req.user._id,
      mentor: mentorId,
      status: "PENDING", 
    });

    console.log("Existing request found?", existing);

    if (existing) {
      return res.status(400).json({ message: "Request already sent and pending" });
    }

    const newRequest = await RequestModel.create({
      mentee: req.user._id,
      mentor: mentorId,
    });

    console.log("Request created:", newRequest);

    res.status(201).json(newRequest);
  } catch (err: any) {
    console.error("Send Request Error:", err.message);
    res.status(500).json({ message: "Error sending mentorship request" });
  }
};


export const getSentRequests = async (req: any, res: Response) => {
  const menteeId = req.user._id;

  try {
    const requests = await RequestModel.find({ mentee: menteeId }).populate("mentor", "-password");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sent requests" });
  }
};

export const getReceivedRequests = async (req: any, res: Response) => {
  const mentorId = req.user._id;

  try {
    const requests = await RequestModel.find({ mentor: mentorId }).populate("mentee", "-password");
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching received requests" });
  }
};

export const updateRequestStatus = async (req: any, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await RequestModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Error updating request" });
  }
};
