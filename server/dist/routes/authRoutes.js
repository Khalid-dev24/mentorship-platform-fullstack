"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
// import { protect } from "../middlewares/authMiddleware";
const router = express_1.default.Router();
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.login);
router.get("/me", (req, res, next) => {
    (async () => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "Unauthorized: No token" });
            }
            const token = authHeader.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const user = await User_1.default.findById(decoded.userId).select("name email role");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
        catch (error) {
            console.error("/me error:", error);
            return res.status(401).json({ message: "Invalid token" });
        }
    })();
});
exports.default = router;
