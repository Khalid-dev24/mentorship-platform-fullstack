import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  sendRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequestStatus
} from "../controllers/requestController";

const router = express.Router();

router.post("/", protect, sendRequest);
router.get("/sent", protect, getSentRequests);
router.get("/received", protect, getReceivedRequests);
router.put("/:id", protect, updateRequestStatus);

export default router;
