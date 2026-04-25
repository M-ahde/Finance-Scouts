import { Router } from "express";
import errorHandler from "strong-error-handler";

import roadmapRoutes from "./roadmap.routes.js";
import achievementRoutes from "./achievement.routes.js";
import joinRequestRoutes from "./joinRequest.routes.js";
import teamMemberRoutes from "./teamMember.routes.js";
import departmentRoutes from "./department.routes.js";
import workshopRoutes from "./workshop.routes.js";
import visit from "./visit.js";
import publicationRoutes from "./publication.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";

const router = Router();

router.use("/roadmaps", roadmapRoutes);
router.use("/achievements", achievementRoutes);
router.use("/join", joinRequestRoutes);
router.use("/team", teamMemberRoutes);
router.use("/departments", departmentRoutes);
router.use("/workshops", workshopRoutes);
router.use("/visit", visit);
router.use('/publications', publicationRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/events", eventRoutes);

router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.get("/health/email", (req, res) => {
  const configured = !!process.env.SMTP;
  res.status(configured ? 200 : 500).json({
    success: configured,
    message: configured ? "Email API key is configured" : "SMTP env variable is not set",
  });
});

router.use(
  errorHandler({
    debug: process.env.NODE_ENV !== "production",
    log: true,
  })
);

export default router;
