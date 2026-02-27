import * as visit from "../services/visit.service.js";

export const count = async (_, res) =>
  res.json(await visit.count());

export const create = async (_, res) =>
  res.status(201).json(await visit.create({}));

export const weekly = async(_, res) => 
  res.json(await visit.weekly([
    {
      $group: {
        _id: { $dayOfWeek: "$createdAt" },
        count: { $sum: 1 }
      }
    }
  ]));