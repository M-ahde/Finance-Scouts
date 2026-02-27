import { Router } from "express";

import * as publicationController from '../../controllers/publication.controller.js';
const router = Router();
import upload from "../../middleware/upload.js";

router.get('/', publicationController.getAll);
router.get('/:id', publicationController.getById);


router.post("/", upload.single("file"), publicationController.create);
router.put("/:id", upload.single("file"), publicationController.update);

router.delete('/:id', publicationController.Delete);

export default router;
