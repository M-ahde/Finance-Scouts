// src/server/models/Workshop.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface WorkshopDocument extends Document {
  title: string;
  description?: string;
  date: Date;
  time?: string;
  location?: string;
}

const WorkshopSchema = new Schema<WorkshopDocument>(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    time: String,
    location: String,
  },
  { timestamps: true }
);

const Workshop: Model<WorkshopDocument> =
  mongoose.models.Workshop ||
  mongoose.model<WorkshopDocument>("Workshop", WorkshopSchema);

export default Workshop;
