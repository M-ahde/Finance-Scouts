// controllers/workshop.controller.js
import * as workshopService from "../services/workshop.service.js";

export const getAll = async (req, res) => {
  try {
    const workshops = await workshopService.getAllWorkshops();
    res.status(200).json(workshops);
  } catch (err) {
    res.status(500).json({ message: "Error fetching workshops", error: err });
  }
};

export const create = async (req, res) => {
  try {
    const workshop = await workshopService.createWorkshop(req.body);
    res.status(201).json(workshop);
  } catch (err) {
    res.status(400).json({ message: "Error creating workshop", error: err });
  }
};

export const update = async (req, res) => {
  try {
    const workshop = await workshopService.updateWorkshop(req.params.id, req.body);
    res.status(200).json(workshop);
  } catch (err) {
    res.status(400).json({ message: "Error updating workshop", error: err });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await workshopService.deleteWorkshop(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "Error deleting workshop", error: err });
  }
};

export const count = async (req, res) => {
    const result = await workshopService.count();
    res.json(result);
  
};