import mongoose, { Schema } from "mongoose";

const TeamMemberSchema = new Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    role: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    department: {
      en: { type: String, default: "" },
      ar: { type: String, default: "" },
    },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);

const TeamMember =
  mongoose.models.TeamMember ||
  mongoose.model("TeamMember", TeamMemberSchema);

export default TeamMember;
