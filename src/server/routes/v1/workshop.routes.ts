import { Router } from "express";
import * as c from "../../controllers/workshop.controller.ts";

const router = Router();

router.get("/", c.getAll);
router.post("/", c.create);

export default router;
