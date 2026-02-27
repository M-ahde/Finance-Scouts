// models/Workshop.model.js
import mongoose from "mongoose";

const WorkshopSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  date: { type: Date, required: true }, // ✅ غيرنا من String إلى Date
  time: { type: String, required: true }, // يمكنك ترك الوقت كسلسلة أو دمجه مع التاريخ
  location: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Workshop || mongoose.model("Workshop", WorkshopSchema);