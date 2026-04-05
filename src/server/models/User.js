import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  permissions: {
    type: [String],
    default: []
  },

  isSuperAdmin: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  resetToken: { type: String },
  resetTokenExpiry: { type: Date },

}, { timestamps: true });

export default mongoose.model("User", userSchema);