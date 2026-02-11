import { Router } from "express";
import { requireAdminApiKey } from "../../middleware/adminAuth.js";
import * as c from "../../controllers/achievement.controller.js";

const router = Router();
router.get("/", c.getAll);
router.post("/", requireAdminApiKey, c.create);
router.delete("/:id", requireAdminApiKey, c.remove);

export default router;
