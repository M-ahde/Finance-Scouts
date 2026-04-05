import EventRegistration from "../models/EventRegistration.js";
import Event from "../models/Event.js";
import { sendEventRegistrationConfirmation } from "../services/email.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, universityId, major, notes } = req.body;

    if (!name?.trim() || !email?.trim())
      return res.status(400).json({ message: "Name and email are required" });

    const reg = await EventRegistration.create({
      eventId: req.params.id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone, universityId, major, notes,
    });

    // Send confirmation email (non-blocking)
    try {
      const event = await Event.findById(req.params.id).lean();
      if (event) {
        await sendEventRegistrationConfirmation({
          to: reg.email,
          name: reg.name,
          eventTitle: event.title,
          eventDate: event.date,
          eventLocation: event.location,
        });
      }
    } catch (emailErr) {
      console.error("Failed to send registration confirmation email:", emailErr.message);
    }

    res.status(201).json({ message: "Registration successful!", id: reg._id });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: "This email is already registered for this event" });
    res.status(500).json({ message: err.message });
  }
};

export const count = async (req, res) => {
  try {
    const n = await EventRegistration.countDocuments({ eventId: req.params.id });
    res.json(n);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const regs = await EventRegistration.find({ eventId: req.params.id })
      .sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
