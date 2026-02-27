// controllers/announcement.controller.js
import * as announcementService from "../services/announcement.services.js";

export const getAll = async (req, res) => {
  try {
    const announcements = await announcementService.getAllAnnouncements();
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Error fetching announcements", error: err });
  }
};

export const create = async (req, res) => {
  try {
    const announcement = await announcementService.createAnnouncement(req.body);
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ message: "Error creating announcement", error: err });
  }
};

export const update = async (req, res) => {
  try {
    const announcement = await announcementService.updateAnnouncement(req.params.id, req.body);
    res.status(200).json(announcement);
  } catch (err) {
    res.status(400).json({ message: "Error updating announcement", error: err });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await announcementService.deleteAnnouncement(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "Error deleting announcement", error: err });
  }
};
