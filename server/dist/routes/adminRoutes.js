"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userController_1 = require("../controllers/userController");
const adminController_1 = require("../controllers/adminController");
const feedbackController_1 = require("../controllers/feedbackController");
const router = express_1.default.Router();
router.get("/users", authMiddleware_1.isAdmin, userController_1.getAllUsers);
router.get("/sessions", authMiddleware_1.isAdmin, adminController_1.getAllSessions);
router.get("/feedback", authMiddleware_1.isAdmin, feedbackController_1.getFeedbackForSession);
exports.default = router;
