import Workshop from "../models/Workshop.js";

export const getAll = () => Workshop.find();
export const create = (data) => Workshop.create(data);
