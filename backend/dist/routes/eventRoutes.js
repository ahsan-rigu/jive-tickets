"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const eventController_1 = require("../controllers/eventController");
const router = express_1.default.Router();
router.post("/", authController_1.authenticate, eventController_1.createEvent);
router.get("/", eventController_1.getAllEvents);
router.get("/:id", eventController_1.getEventById);
router.patch("/:id", authController_1.authenticate, eventController_1.updateEvent);
router.delete("/:id", authController_1.authenticate, eventController_1.deleteEvent);
exports.default = router;
