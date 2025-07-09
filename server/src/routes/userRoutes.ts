import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import { updateProfile, getAllMentors, getAllUsers, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.put("/me/profile", updateProfile as any);

router.get("/me/profile", getUserProfile);
router.get("/mentors", getAllMentors);
router.get("/profile", getUserProfile);



export default router;
