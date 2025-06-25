import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/readAll", getAllEvents); 
router.get("/read/:id", getEventById); 

router.post("/create", requireAuth, requireAdmin, createEvent);
router.put("/update/:id", requireAuth, requireAdmin, updateEvent);
router.delete("/delete/:id", requireAuth, requireAdmin, deleteEvent);

export default router;
