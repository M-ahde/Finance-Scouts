// src/server/models/TeamMember.ts
import mongoose, { Schema } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: String,
    avatar: String,
  },
  { timestamps: true }
);

const TeamMember =
  mongoose.models.TeamMember ||
  mongoose.model("TeamMember", TeamMemberSchema);

export default TeamMember;
