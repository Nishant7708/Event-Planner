import Rsvp from "../models/Rsvp.js";
import Event from "../models/Event.js";

// Submit or Update RSVP
export const submitRsvp = async (req, res) => {
  try {
    const { eventId, status } = req.body;
    if (!eventId || !status) {
      return res.status(400).json({ message: "Event and status are required" });
    }
    const validStatuses = ["Going", "Maybe", "Declined"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid RSVP status" });
    }
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const now = new Date();
    const eventDate = new Date(event.date);
    if (eventDate < now) {
      return res.status(400).json({ message: "Cannot RSVP to past events" });
    }

    const existing = await Rsvp.findOne({ user: req.user.id, event: eventId });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.status(200).json({ message: "RSVP updated", rsvp: existing });
    }

    const rsvp = new Rsvp({
      user: req.user.id,
      event: eventId,
      status,
    });

    await rsvp.save();

    res.status(201).json({ message: "RSVP submitted", rsvp });
  } catch (err) {
    res.status(500).json({ message: "RSVP error", error: err.message });
  }
};

export const getMyRsvps = async (req, res) => {
  try {
    const rsvps = await Rsvp.find({ user: req.user.id }).populate("event");
    res.status(200).json({ rsvps });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching RSVPs", error: err.message });
  }
};

export const getRsvpSummary = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const allRsvps = await Rsvp.find({ event: eventId });

    const summary = {
      Going: allRsvps.filter((r) => r.status === "Going").length,
      Maybe: allRsvps.filter((r) => r.status === "Maybe").length,
      Declined: allRsvps.filter((r) => r.status === "Declined").length,
    };

    res.status(200).json({ event: event.title, summary });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching summary", error: err.message });
  }
};
