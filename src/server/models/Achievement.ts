// src/server/models/Achievement.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface AchievementDocument extends Document {
  title: string;
  date: string;
  description: string;
}

const AchievementSchema = new Schema<AchievementDocument>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Achievement: Model<AchievementDocument> =
  mongoose.models.Achievement ||
  mongoose.model<AchievementDocument>("Achievement", AchievementSchema);

export default Achievement;
