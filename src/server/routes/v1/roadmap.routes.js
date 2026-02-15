import { Router } from "express";
import { requireAdminApiKey } from "../../middleware/adminAuth.js";
import * as c from "../../controllers/roadmap.controller.js";

const router = Router();

router.get("/", c.getAll);
router.get("/:id", c.getOne);
router.post("/", requireAdminApiKey, c.create);
router.put("/:id", requireAdminApiKey, c.update);
router.delete("/:id", requireAdminApiKey, c.remove);

export default router;
