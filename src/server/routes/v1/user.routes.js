import { Router } from "express";
import bcrypt from "bcrypt";
import User from "../../models/User.js";
import Log from "../../models/Log.js";
import auth from "../../middleware/auth.js";
import requirePermission from "../../middleware/requirePermission.js";
import { sendWelcomeEmail } from "../../services/email.service.js";

const router = Router();


// 🔹 إنشاء مستخدم
router.post("/create",
  auth,
  requirePermission("create_user"),
  async (req, res) => {

    const { name, email, password, permissions } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const isSuperAdmin = email === process.env.MAIN_ADMIN_EMAIL;

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      permissions,
      isSuperAdmin
    });

    await Log.create({
      userId: req.user.id,
      action: "CREATE_USER",
      targetId: newUser._id,
      details: { email }
    });

    // Send welcome email with credentials (non-blocking)
    try {
      await sendWelcomeEmail({ to: email, name, email, password });
    } catch (emailErr) {
      console.error("Failed to send welcome email:", emailErr.message);
    }

    res.json(newUser);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // Auto-promote if this is the designated super-admin email
    const isSuperAdmin = !!(process.env.MAIN_ADMIN_EMAIL && email === process.env.MAIN_ADMIN_EMAIL);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      permissions: [],
      isSuperAdmin,
      isActive: true
    });

    // تسجيل الحدث في الـ Log (اختياري)
    await Log.create({
      userId: newUser._id,
      action: "REGISTER_USER",
      targetId: newUser._id,
      details: { name, email }
    });

    res.json({ message: "Account created successfully!" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});
router.put("/update/:id",
  auth,
  requirePermission("edit_user"),
  async (req, res) => {

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    await Log.create({
      userId: req.user.id,
      action: "UPDATE_USER",
      targetId: updated._id,
      details: req.body
    });

    res.json(updated);
});


router.delete("/delete/:id",
  auth,
  requirePermission("delete_user"),
  async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    await Log.create({
      userId: req.user.id,
      action: "DELETE_USER",
      targetId: req.params.id
    });

    res.json({ message: "Deleted" });
});


router.get("/logs",
  auth,
  requirePermission("view_logs"),
  async (req, res) => {

    const logs = await Log.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(logs);
});


// 🔹 قائمة كل المستخدمين (للسوبر أدمين وإدارة الصلاحيات)
router.get("/",
  auth,
  requirePermission("manage_users"),
  async (req, res) => {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  }
);


// 🔹 تحديث صلاحيات مستخدم
router.patch("/:id/permissions",
  auth,
  requirePermission("manage_users"),
  async (req, res) => {
    const { permissions } = req.body;

    if (!Array.isArray(permissions))
      return res.status(400).json({ message: "permissions must be an array" });

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { permissions },
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ message: "User not found" });

    await Log.create({
      userId: req.user.id,
      action: "UPDATE_PERMISSIONS",
      targetId: updated._id,
      details: { permissions }
    });

    res.json(updated);
  }
);

export default router;
