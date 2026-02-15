import { Router } from "express";
import * as c from "../../controllers/dashboard.controller.js";
import { requireAdminApiKey } from "../../middleware/adminAuth.js";

const router = Router();

router.get("/overview", requireAdminApiKey, c.getOverview);

export default router;
