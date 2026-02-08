import TeamMember from "../models/TeamMember.ts";

export const getAll = () => TeamMember.find();
export const create = (data: any) => TeamMember.create(data);
