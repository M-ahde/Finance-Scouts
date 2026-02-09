import TeamMember from "../models/TeamMember.js";

export const getAll = () => TeamMember.find();
export const create = (data) => TeamMember.create(data);
