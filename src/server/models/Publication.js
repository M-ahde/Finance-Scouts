import mongoose, { Schema } from "mongoose";

const PublicationSchema = new Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  type: {
    en: { type: String, default: "Report" },
    ar: { type: String, default: "تقرير" }
  },
  pdfUrl: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }
},
  { timestamps: true }
);

const publication =
  mongoose.models.publication ||
  mongoose.model("publication", PublicationSchema);

export default publication;