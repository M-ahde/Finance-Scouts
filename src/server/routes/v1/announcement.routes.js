// routes/announcement.routes.js
import { Router } from "express";
import * as c from "../../controllers/announcement.controller.js";

const router = Router();

router.get("/", c.getAll);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

export default router;
