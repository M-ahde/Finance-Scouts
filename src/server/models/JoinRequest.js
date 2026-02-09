// src/server/models/JoinRequest.ts
import mongoose, { Schema } from "mongoose";


const JoinRequestSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    major: { type: String, required: true },
    year: { type: String, required: true },
    motivation: { type: String, required: true },
  },
  { timestamps: true }
);

const JoinRequest =
  mongoose.models.JoinRequest ||
  mongoose.model("JoinRequest", JoinRequestSchema);

export default JoinRequest;
