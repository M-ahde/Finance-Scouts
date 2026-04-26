import mongoose from "mongoose";

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  bio: { type: String },
  photo: { type: String },
  speakingTime: { type: String }, // e.g. "10:00 AM - 10:45 AM"
}, { _id: true });

const TimelineItemSchema = new mongoose.Schema({
  time: { type: String, required: true }, // e.g. "09:00"
  title: { type: String, required: true },
  description: { type: String },
}, { _id: true });

const SponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  website: { type: String },
}, { _id: true });

const SponsorTierSchema = new mongoose.Schema({
  tierName: { type: String, required: true }, // e.g. "Gold", "Silver"
  order: { type: Number, default: 0 },        // display order (0 = top)
  sponsors: [SponsorSchema],
}, { _id: true });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: { type: String, required: true },
  about: { type: String },                // expanded about section
  date: { type: Date, required: true },
  endDate: { type: Date },                // optional end time
  location: { type: String },
  registrationLink: { type: String },

  timeline: [TimelineItemSchema],
  speakers: [SpeakerSchema],
  targetAudience: { type: String },       // rich text / paragraph

  sponsorTiers: [SponsorTierSchema],

  // Appearance
  design: {
    type: String,
    enum: ["elegant", "vibrant", "minimal", "corporate", "midnight", "emerald", "sunset", "ocean", "purpleRain", "carbon", "roseGold", "arctic", "forest", "retro", "neon", "cream", "custom"],
    default: "elegant",
  },
  customCSS: { type: String, default: "" },
  logoUrl: { type: String },

  isPublished: { type: Boolean, default: false },
  coverImage: { type: String },

}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
