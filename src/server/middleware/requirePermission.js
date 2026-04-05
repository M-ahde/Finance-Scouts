export default function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized" });

    // SuperAdmin bypasses every permission check
    if (req.user.isSuperAdmin)
      return next();

    const perms = req.user.permissions ?? [];

    if (!perms.includes(permission))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
}
