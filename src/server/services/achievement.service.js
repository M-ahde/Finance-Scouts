import Achievement from "../models/Achievement.js";

export const getAllAchievements = () => Achievement.find();
export const createAchievement = (data) => Achievement.create(data);
export const deleteAchievement = (id) =>
  Achievement.findByIdAndDelete(id);
