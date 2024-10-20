"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticketController_1 = require("../controllers/ticketController");
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post("/", authController_1.authenticate, ticketController_1.purchaseTicket);
router.get("/user/:userId", authController_1.authenticate, ticketController_1.getUserTickets);
router.post("/validate", ticketController_1.validateTicket);
exports.default = router;
