// routes/workshop.routes.js
import { Router } from "express";
import * as c from "../../controllers/workshop.controller.js";

const router = Router();

router.get("/", c.getAll);
router.post("/", c.create);
router.put("/:id", c.update);
router.delete("/:id", c.remove);
router.get('/count',c.count);
export default router;
