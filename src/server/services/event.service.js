import Event from "../models/Event.js";

export const getAll = () =>
  Event.find().sort({ date: -1 });

export const getPublished = () =>
  Event.find({ isPublished: true }).sort({ date: 1 });

export const getBySlug = (slug) =>
  Event.findOne({ slug });

export const getById = (id) =>
  Event.findById(id);

export const create = (data) =>
  Event.create(data);

export const update = (id, data) =>
  Event.findByIdAndUpdate(id, data, { new: true });

export const remove = (id) =>
  Event.findByIdAndDelete(id);
