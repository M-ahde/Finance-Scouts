// src/server/models/Department.ts
import mongoose, { Schema} from "mongoose";


const DepartmentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Department =
  mongoose.models.Department ||
  mongoose.model("Department", DepartmentSchema);

export default Department;
