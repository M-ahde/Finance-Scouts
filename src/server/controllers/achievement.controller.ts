import type { Request, Response } from "express";
import * as Service from "../services/achievement.service.ts";

export const getAll = async (_: Request, res: Response) => {
  res.json(await Service.getAllAchievements());
};

export const create = async (req: Request, res: Response) => {
  res.status(201).json(await Service.createAchievement(req.body));
};

export const remove = async (req: Request, res: Response) => {
  await Service.deleteAchievement(req.params.id);
  res.sendStatus(204);
};
