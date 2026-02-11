import * as Service from "../services/dashboard.service.js";

export const getOverview = async (_, res) => {
  res.json(await Service.getOverview());
};
