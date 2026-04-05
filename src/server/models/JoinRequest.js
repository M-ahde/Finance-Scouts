// src/server/models/JoinRequest.ts
import mongoose, { Schema } from "mongoose";

const JoinRequestSchema = new Schema(
  {
    arabicName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    englishName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 15,
    },
    nationalId: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    universityId: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,  
      maxlength: 20,
    },
    universityEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    committee: {
      type: [String], // array of strings
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one committee must be selected",
      },
      enum: [
        "management",
        "content",
        "design",
        "media",
        "pr",
        "documentation",
      ],
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "denied"],
      default: "pending",
    },

  },
  { timestamps: true }
);

const JoinRequest =
  mongoose.models.JoinRequest ||
  mongoose.model("JoinRequest", JoinRequestSchema);

export default JoinRequest;
