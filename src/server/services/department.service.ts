import Department from "../models/Department.ts";

export const getAll = () => Department.find();
export const create = (data: any) => Department.create(data);
