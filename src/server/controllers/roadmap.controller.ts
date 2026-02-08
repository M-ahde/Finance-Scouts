import type { Request, Response } from "express";
import * as Service from "../services/roadmap.service.ts";

export const getAll = async (_: Request, res: Response) =>
  res.json(await Service.getAll());

export const getOne = async (req: Request, res: Response) =>
  res.json(await Service.getById(req.params.id));

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await Service.create(req.body));

export const update = async (req: Request, res: Response) =>
  res.json(await Service.update(req.params.id, req.body));

export const remove = async (req: Request, res: Response) => {
  await Service.remove(req.params.id);
  res.sendStatus(204);
};
