import { Router } from "express";
import * as c from "../../controllers/joinRequest.controller.ts";

const router = Router();

router.post("/", c.create);
router.get("/", c.getAll);

export default router;
