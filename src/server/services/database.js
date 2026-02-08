import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGO_URI ;

  try {
    await mongoose.connect(uri);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB Disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB Reconnected");
  });
}