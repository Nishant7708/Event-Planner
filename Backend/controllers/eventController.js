import Event from "../models/Event.js";


export const createEvent = async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, location } = req.body;

    if (!title || !description || !date || !startTime || !endTime || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      createdBy: req.user.id,
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ message: "Error fetching events", error: err.message });
  }
};


export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ event });
  } catch (err) {
    res.status(500).json({ message: "Error fetching event", error: err.message });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event updated", event });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event", error: err.message });
  }
};
