import * as Service from "../services/joinRequest.service.js";
import { sendJoinRequestReceived, sendJoinRequestStatus } from "../services/email.service.js";

export const create = async (req, res) => {
  const created = await Service.create(req.body);

  // Notify applicant that their request was received
  try {
    await sendJoinRequestReceived({
      to: created.universityEmail,
      name: created.arabicName || created.englishName,
    });
  } catch (emailErr) {
    console.error("Failed to send join request received email:", emailErr.message);
  }

  res.status(201).json(created);
};

export const getAll = async (_, res) =>
  res.json(await Service.getAll());

export const count = async (_, res) =>
  res.json(await Service.count());

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["accepted", "denied", "pending"].includes(status))
    return res.status(400).json({ message: "Invalid status value" });

  const updated = await Service.updateStatus(id, status);
  if (!updated) return res.status(404).json({ message: "Request not found" });

  // Send email on accepted or denied (non-blocking)
  if (status === "accepted" || status === "denied") {
    try {
      await sendJoinRequestStatus({
        to: updated.universityEmail,
        name: updated.arabicName || updated.englishName,
        status,
      });
    } catch (emailErr) {
      console.error("Failed to send join request status email:", emailErr.message);
    }
  }

  res.json(updated);
};
