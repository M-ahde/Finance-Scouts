import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function auth(req, res, next) {
  const token = req?.cookies?.token;

  if (!token)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Always fetch fresh from DB so permission changes take effect immediately
    // without requiring the user to re-login
    const user = await User.findById(decoded.id).select("-password");

    if (!user)
      return res.status(401).json({ message: "User not found" });

    if (!user.isActive)
      return res.status(403).json({ message: "Account is disabled" });

    req.user = {
      id: user._id,
      permissions: user.permissions ?? [],
      isSuperAdmin: user.isSuperAdmin ?? false,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
