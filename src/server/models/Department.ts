// src/server/models/Department.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface DepartmentDocument extends Document {
  key: string;
  name: string;
  description: string;
}

const DepartmentSchema = new Schema<DepartmentDocument>(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Department: Model<DepartmentDocument> =
  mongoose.models.Department ||
  mongoose.model<DepartmentDocument>("Department", DepartmentSchema);

export default Department;
