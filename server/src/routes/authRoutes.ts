import express from "express";
import { registerUser, login } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

// ✅ Restore this route to send the full user object
router.get("/me", protect, (req: express.Request, res: express.Response) => {
  res.json(req.user); // This lets the dashboard and navbar get user info
});

export default router;
