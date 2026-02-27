// models/Announcement.model.js
import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  date: { type: String, required: true }, // يمكن استخدام Date type حسب الحاجة
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
