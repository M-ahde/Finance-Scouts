// src/server/models/TeamMember.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface TeamMemberDocument extends Document {
  name: string;
  role: string;
  department?: string;
  avatar?: string;
}

const TeamMemberSchema = new Schema<TeamMemberDocument>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: String,
    avatar: String,
  },
  { timestamps: true }
);

const TeamMember: Model<TeamMemberDocument> =
  mongoose.models.TeamMember ||
  mongoose.model<TeamMemberDocument>("TeamMember", TeamMemberSchema);

export default TeamMember;
