import * as Service from "../services/joinRequest.service.js";

export const create = async (req, res) =>
  res.status(201).json(await Service.create(req.body));

export const getAll = async (_, res) =>
  res.json(await Service.getAll());
