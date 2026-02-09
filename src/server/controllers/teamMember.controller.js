import * as Service from "../services/teamMember.service.js";

export const getAll = async (_, res) =>
  res.json(await Service.getAll());

export const create = async (req, res) =>
  res.status(201).json(await Service.create(req.body));
