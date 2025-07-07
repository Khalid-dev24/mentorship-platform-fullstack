"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/me/profile", userController_1.getUserProfile);
router.get("/mentors", userController_1.getAllMentors);
router.get("/profile", userController_1.getUserProfile);
router.get("/test", (req, res) => {
    res.send("✅ User route is active");
});
exports.default = router;
