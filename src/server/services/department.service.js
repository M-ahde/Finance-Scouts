import Department from "../models/Department.js";

export const getAll = () => Department.find();
export const create = (data) => Department.create(data);
