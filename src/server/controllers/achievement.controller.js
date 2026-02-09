import * as Service from "../services/achievement.service.js";

export const getAll = async (_, res) => {
  res.json(await Service.getAllAchievements());
};

export const create = async (req, res) => {
  res.status(201).json(await Service.createAchievement(req.body));
};

export const remove = async (req, res) => {
  await Service.deleteAchievement(req.params.id);
  res.sendStatus(204);
};
