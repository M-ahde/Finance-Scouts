import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  action: String,
  targetId: String,
  details: Object,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Log", logSchema);