import { Router } from "express";
import * as c from "../../controllers/joinRequest.controller.js";

const router = Router();

router.post("/", c.create);
router.get("/", c.getAll);
router.get("/count", c.count);
export default router;
