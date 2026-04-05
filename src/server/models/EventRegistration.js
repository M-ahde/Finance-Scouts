import mongoose from "mongoose";

const EventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  universityId: { type: String, trim: true },
  major: { type: String, trim: true },
  notes: { type: String, trim: true },
}, { timestamps: true });

// Prevent same email registering twice per event
EventRegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

export default mongoose.models.EventRegistration ||
  mongoose.model("EventRegistration", EventRegistrationSchema);
