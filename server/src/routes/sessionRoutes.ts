import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { bookSession, getMySessions } from "../controllers/sessionController";

const router = express.Router();

router.post("/", bookSession); // mentee books
router.get("/", getMySessions); // mentor/mentee views sessions

export default router;
