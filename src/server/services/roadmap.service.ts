import Roadmap from "../models/Roadmap.ts";

export const getAll = () => Roadmap.find().sort({ createdAt: 1 });

export const getById = (id: string) => Roadmap.findById(id);

export const create = (data: any) => Roadmap.create(data);

export const update = (id: string, data: any) =>
  Roadmap.findByIdAndUpdate(id, data, { new: true });

export const remove = (id: string) => Roadmap.findByIdAndDelete(id);
