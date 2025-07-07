import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import { updateProfile, getAllMentors, getAllUsers, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/me/profile", getUserProfile);
router.get("/mentors", getAllMentors);
router.get("/profile", getUserProfile);
router.get("/test", (req, res) => {
  res.send("✅ User route is active");
});



export default router;
