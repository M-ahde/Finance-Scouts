import * as Service from "../services/roadmap.service.js";

export const getAll = async (_, res) =>
  res.json(await Service.getAll());

export const getOne = async (req, res) =>
  res.json(await Service.getById(req.params.id));

export const create = async (req, res) =>
  res.status(201).json(await Service.create(req.body));

export const update = async (req, res) =>
  res.json(await Service.update(req.params.id, req.body));

export const remove = async (req, res) => {
  await Service.remove(req.params.id);
  res.sendStatus(204);
};
