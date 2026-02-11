import { Router } from "express";
import { requireAdminApiKey } from "../../middleware/adminAuth.js";
import * as c from "../../controllers/joinRequest.controller.js";

const router = Router();

router.post("/", requireAdminApiKey, c.create);
router.get("/", requireAdminApiKey, c.getAll);

export default router;
