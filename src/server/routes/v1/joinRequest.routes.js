import { Router } from "express";
import * as c from "../../controllers/joinRequest.controller.js";
import auth from "../../middleware/auth.js";
import requirePermission from "../../middleware/requirePermission.js";

const router = Router();

router.post("/", c.create);
router.get("/", auth, requirePermission("manage_join_requests"), c.getAll);
router.get("/count", auth, requirePermission("view_dashboard"), c.count);
router.patch("/:id/status", auth, requirePermission("manage_join_requests"), c.updateStatus);

export default router;
