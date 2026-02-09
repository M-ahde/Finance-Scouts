import { Router } from "express";
import * as c from "../../controllers/teamMember.controller.js";

const router = Router();

router.get("/", c.getAll);
router.post("/", c.create);

export default router;
