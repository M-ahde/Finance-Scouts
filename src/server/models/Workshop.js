// src/server/models/Workshop.ts
import mongoose, { Schema } from "mongoose";



const WorkshopSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    time: String,
    location: String,
  },
  { timestamps: true }
);

const Workshop  =
  mongoose.models.Workshop ||
  mongoose.model("Workshop", WorkshopSchema);

export default Workshop;
