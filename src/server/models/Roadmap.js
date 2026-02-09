// src/server/models/Roadmap.ts
import mongoose, { Schema } from "mongoose";


const RoadmapSchema = new Schema(
  {
    title: { type: String, required: true },
    period: { type: String, required: true },
    items: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Roadmap =
  mongoose.models.Roadmap ||
  mongoose.model("Roadmap", RoadmapSchema);

export default Roadmap;
