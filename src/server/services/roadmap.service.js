import Roadmap from "../models/Roadmap.js";

export const getAll = () => Roadmap.find().sort({ createdAt: 1 });

export const getById = (id) => Roadmap.findById(id);

export const create = (data) => Roadmap.create(data);

export const update = (id, data) =>
  Roadmap.findByIdAndUpdate(id, data, { new: true });

export const remove = (id) => Roadmap.findByIdAndDelete(id);
