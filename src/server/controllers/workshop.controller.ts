import type { Request, Response } from "express";
import * as Service from "../services/workshop.service.ts";

export const getAll = async (_: Request, res: Response) =>
  res.json(await Service.getAll());

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await Service.create(req.body));
