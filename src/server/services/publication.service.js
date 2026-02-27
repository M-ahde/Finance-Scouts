import Publication from '../models/Publication.js';

export const getAllPublications = async () => {
  return await Publication.find().sort({ createdAt: -1 });
};

export const getPublicationById = async (id) => {
  return await Publication.findById(id);
};

export const createPublication = async (data) => {
  const newPub = new Publication(data);
  return await newPub.save();
};

export const updatePublication = async (id, data) => {
  return await Publication.findByIdAndUpdate(id, data, { new: true });
};

export const deletePublication = async (id) => {
  return await Publication.findByIdAndDelete(id);
};
