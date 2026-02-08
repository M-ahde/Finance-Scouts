import Workshop from "../models/Workshop.ts";

export const getAll = () => Workshop.find();
export const create = (data: any) => Workshop.create(data);
