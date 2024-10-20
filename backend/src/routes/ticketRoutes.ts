import express from "express";
import {
  purchaseTicket,
  getUserTickets,
  validateTicket,
} from "../controllers/ticketController";
import { authenticate } from "../controllers/authController";

const router = express.Router();

router.post("/", authenticate, purchaseTicket);
router.get("/user/:userId", authenticate, getUserTickets);
router.post("/validate", validateTicket);

export default router;
