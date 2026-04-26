import { Router } from "express";
import * as c from "../../controllers/event.controller.js";
import * as reg from "../../controllers/eventRegistration.controller.js";
import auth from "../../middleware/auth.js";
import requirePermission from "../../middleware/requirePermission.js";
import logoUpload from "../../middleware/logoUpload.js";
import coverUpload from "../../middleware/coverUpload.js";

const router = Router();

// Public routes
router.get("/public", c.getPublished);
router.get("/slug/:slug", c.getBySlug);

// Public registration
router.post("/:id/register", reg.register);
router.get("/:id/registrations/count", reg.count);

// Logo upload
router.post("/upload-logo", auth, requirePermission("manage_events"), logoUpload.single("logo"), c.uploadLogo);

// Cover image upload
router.post("/upload-cover", auth, requirePermission("manage_events"), coverUpload.single("cover"), c.uploadCover);

// Dashboard routes (require auth)
router.get("/", auth, requirePermission("view_dashboard"), c.getAll);
router.get("/:id/registrations", auth, requirePermission("manage_events"), reg.getAll);
router.get("/:id", auth, requirePermission("view_dashboard"), c.getById);
router.post("/", auth, requirePermission("manage_events"), c.create);
router.put("/:id", auth, requirePermission("manage_events"), c.update);
router.delete("/:id", auth, requirePermission("manage_events"), c.remove);

export default router;
