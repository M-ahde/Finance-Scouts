import { Router } from "express";
import * as c from "../../controllers/visit.controller.js";

const router = Router();

router.get("/count", c.count);
router.post("/", c.create);
router.get('/weekly', c.weekly);
export default router;



