import express from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  sendRequest,
  getSentRequests,
  getReceivedRequests,
  updateRequestStatus
} from "../controllers/requestController";

const router = express.Router();

router.post("/",  sendRequest);
router.get("/sent", getSentRequests);
router.get("/received",  getReceivedRequests);
router.put("/:id", updateRequestStatus);

export default router;
