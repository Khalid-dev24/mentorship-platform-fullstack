import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { bookSession, getMySessions } from "../controllers/sessionController";

const router = express.Router();

router.post("/", protect, bookSession); // mentee books
router.get("/", protect, getMySessions); // mentor/mentee views sessions

export default router;
