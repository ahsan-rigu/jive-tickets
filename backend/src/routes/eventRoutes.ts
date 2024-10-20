import express from "express";

import { authenticate } from "../controllers/authController";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from "../controllers/eventController";

const router = express.Router();

router.post("/", authenticate, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.patch("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, deleteEvent);

export default router;
