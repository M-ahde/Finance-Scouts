import TeamMember from "../models/TeamMember.js";

/* ========================= GET ALL ========================= */
export const getAll = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (_err) {
    res.status(500).json({ message: "Failed to fetch team members" });
  }
};

/* ========================= GET BY ID ========================= */
export const getById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
};

/* ========================= CREATE ========================= */
export const create = async (req, res) => {
  try {
    const { name, role, department, avatar } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required" });
    }

    const newMember = await TeamMember.create({
      name,
      role,
      department,
      avatar,
    });

    res.status(201).json(newMember);
  } catch {
    res.status(500).json({ message: "Failed to create member" });
  }
};

/* ========================= UPDATE ========================= */
export const update = async (req, res) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

/* ========================= DELETE ========================= */
export const remove = async (req, res) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};