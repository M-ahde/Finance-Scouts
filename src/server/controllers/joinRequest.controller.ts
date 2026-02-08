import type { Request, Response } from "express";
import * as Service from "../services/joinRequest.service.ts";

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await Service.create(req.body));

export const getAll = async (_: Request, res: Response) =>
  res.json(await Service.getAll());
