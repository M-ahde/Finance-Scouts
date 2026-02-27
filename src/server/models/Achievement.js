// src/server/models/Achievement.ts
import mongoose, { Schema } from "mongoose";

const MultiLangString = {
  en: { type: String, required: true },
  ar: { type: String, required: true },
};

const AchievementSchema = new Schema(
  {
    title: {
      type: MultiLangString,
      required: true,
    },
    description: {
      type: MultiLangString,
      required: true,
    },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Achievement =
  mongoose.models.Achievement ||
  mongoose.model("Achievement", AchievementSchema);

export default Achievement;