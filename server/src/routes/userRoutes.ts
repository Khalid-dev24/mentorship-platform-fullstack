import express from "express";
import { protect, isAdmin } from "../middlewares/authMiddleware";
import { updateProfile, getAllMentors, getAllUsers, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.put("/me/profile", protect as express.RequestHandler, updateProfile as express.RequestHandler);
router.get("/mentors", protect, getAllMentors);
router.get("/profile", protect, getUserProfile);
router.get("/test", (req, res) => {
  res.send("✅ User route is active");
});



export default router;
