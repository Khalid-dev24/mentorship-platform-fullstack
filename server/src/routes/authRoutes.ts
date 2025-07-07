import express from "express";
import { registerUser, login } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);


router.get("/me", (req: express.Request, res: express.Response) => {
  res.json((req as any).user); 
});

export default router;
