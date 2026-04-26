import * as Service from "../services/event.service.js";

const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getAll = async (req, res) => {
  try {
    const events = await Service.getAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPublished = async (req, res) => {
  try {
    const events = await Service.getPublished();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBySlug = async (req, res) => {
  try {
    const event = await Service.getBySlug(req.params.slug);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const event = await Service.getById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }
    const event = await Service.create(data);
    res.status(201).json(event);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "An event with this slug already exists" });
    }
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const event = await Service.update(req.params.id, req.body);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Service.remove(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadLogo = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file provided" });
  res.json({ url: req.file.path });
};

export const uploadCover = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file provided" });
  res.json({ url: req.file.path });
};
