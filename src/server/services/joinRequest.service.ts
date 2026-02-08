import JoinRequest from "../models/JoinRequest.ts";

export const create = (data: any) => JoinRequest.create(data);
export const getAll = () => JoinRequest.find().sort({ createdAt: -1 });
