import { Router } from "express";
import * as c from "../../controllers/joinRequest.controller.js";
import auth from "../../middleware/auth.js";
import requirePermission from "../../middleware/requirePermission.js";
import config from "../../config/index.js";

const router = Router();

router.post("/", c.create);
router.get("/", auth, requirePermission("manage_join_requests"), c.getAll);
router.get("/count", auth, requirePermission("view_dashboard"), c.count);
router.patch("/:id/status", auth, requirePermission("manage_join_requests"), c.updateStatus);
router.get("/levels", (req, res) => {
  res.json(config.join.levels);
});

export default router;
