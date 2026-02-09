// src/server/models/Achievement.ts
import mongoose, { Schema } from "mongoose";



const AchievementSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model("Achievement", AchievementSchema);

export default Achievement;
