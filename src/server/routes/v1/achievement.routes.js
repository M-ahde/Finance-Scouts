import { Router } from "express";
import * as c from "../../controllers/achievement.controller.js";

const router = Router();
router.get("/", c.getAll);
router.post("/", c.create);
router.delete("/:id", c.remove);

export default router;
