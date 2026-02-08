import Achievement from "../models/Achievement.ts";

export const getAllAchievements = () => Achievement.find();
export const createAchievement = (data: any) => Achievement.create(data);
export const deleteAchievement = (id: string) =>
  Achievement.findByIdAndDelete(id);
