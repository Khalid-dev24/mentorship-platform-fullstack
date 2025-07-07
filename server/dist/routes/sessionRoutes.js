"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = require("../controllers/sessionController");
const router = express_1.default.Router();
router.post("/", sessionController_1.bookSession); // mentee books
router.get("/", sessionController_1.getMySessions); // mentor/mentee views sessions
exports.default = router;
