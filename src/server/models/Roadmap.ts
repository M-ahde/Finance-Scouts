// src/server/models/Roadmap.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface RoadmapDocument extends Document {
  title: string;
  period: string;
  items: string[];
}

const RoadmapSchema = new Schema<RoadmapDocument>(
  {
    title: { type: String, required: true },
    period: { type: String, required: true },
    items: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Roadmap: Model<RoadmapDocument> =
  mongoose.models.Roadmap ||
  mongoose.model<RoadmapDocument>("Roadmap", RoadmapSchema);

export default Roadmap;
