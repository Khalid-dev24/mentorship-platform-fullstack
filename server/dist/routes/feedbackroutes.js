"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController");
const router = express_1.default.Router();
router.post("/", (req, res) => (0, feedbackController_1.leaveFeedback)(req, res));
router.get("/:sessionId", (req, res) => (0, feedbackController_1.getFeedbackForSession)(req, res));
exports.default = router;
