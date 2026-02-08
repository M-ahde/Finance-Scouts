// src/server/models/JoinRequest.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface JoinRequestDocument extends Document {
  fullName: string;
  email: string;
  major: string;
  year: string;
  motivation: string;
}

const JoinRequestSchema = new Schema<JoinRequestDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    major: { type: String, required: true },
    year: { type: String, required: true },
    motivation: { type: String, required: true },
  },
  { timestamps: true }
);

const JoinRequest: Model<JoinRequestDocument> =
  mongoose.models.JoinRequest ||
  mongoose.model<JoinRequestDocument>("JoinRequest", JoinRequestSchema);

export default JoinRequest;
