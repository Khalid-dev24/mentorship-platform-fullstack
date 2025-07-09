import express, { Request, Response, NextFunction} from "express";
import { registerUser, login } from "../controllers/authController";
import jwt from "jsonwebtoken";
import User from "../models/User";
// import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser as any);
router.post("/login", login as any);


router.get("/me", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };

      const user = await User.findById(decoded.userId).select("name email role");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("/me error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  })();
});


export default router;
