import JoinRequest from "../models/JoinRequest.js";

export const create = (data) => JoinRequest.create(data);
export const getAll = () => JoinRequest.find().sort({ createdAt: -1 });
