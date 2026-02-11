import { Router } from "express";
import { requireAdminApiKey } from "../../middleware/adminAuth.js";
import * as c from "../../controllers/teamMember.controller.js";

const router = Router();

router.get("/", c.getAll);
router.post("/", requireAdminApiKey, c.create);

export default router;
