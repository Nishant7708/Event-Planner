import express from "express";
import {
  submitRsvp,
  getMyRsvps,
  getRsvpSummary,
} from "../controllers/rsvpController.js";

import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, submitRsvp); 
router.get("/user", requireAuth, getMyRsvps); 
router.get("/summary/:eventId", requireAuth, requireAdmin, getRsvpSummary); 

export default router;
