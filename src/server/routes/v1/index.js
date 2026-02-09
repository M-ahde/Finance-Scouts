import { Router } from "express";
import errorHandler from "strong-error-handler";
// import contactRoutes from "./contact.route.js";
// import taskRoutes from "./task.route.js";
// import projectRoutes from "./project.route.js";


import roadmapRoutes from "./roadmap.routes.js";
import achievementRoutes from "./achievement.routes.js";
import joinRequestRoutes from "./joinRequest.routes.js";
import teamMemberRoutes from "./teamMember.routes.js";
import departmentRoutes from "./department.routes.js";
import workshopRoutes from "./workshop.routes.js";

import { connectDatabase } from "../../services/database.js";

connectDatabase();

const router = Router();

router.use("/roadmaps", roadmapRoutes);
router.use("/achievements", achievementRoutes);
router.use("/join", joinRequestRoutes);
router.use("/team", teamMemberRoutes);
router.use("/departments", departmentRoutes);
router.use("/workshops", workshopRoutes);

// router.use("/contact", contactRoutes);
// router.use("/task", taskRoutes);
// router.use("/project", projectRoutes);

/**
 * GET /health
 * Health check endpoint.
 */
router.get("/health", (req, res) => {
  res.send("Ok");
});

// Error handling middleware
router.use(
  errorHandler({
    debug: process.env.ENV !== "prod",
    log: true,
  })
);

export default router;
