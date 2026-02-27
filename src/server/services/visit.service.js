import Visit from "../models/Visit.js";

export const count = () => Visit.countDocuments();
export const create = (data) => Visit.create(data);
export const weekly = (data) => Visit.aggregate(data);