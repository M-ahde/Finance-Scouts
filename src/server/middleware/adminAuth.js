import crypto from "crypto";
import config from "../config/index.js";

const safeCompare = (left, right) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

export const requireAdminApiKey = (req, res, next) => {
  const configuredKey = config.security.adminApiKey;

  if (!configuredKey) {
    if (config.isProduction) {
      return res.status(503).json({
        success: false,
        message: "Admin API key is not configured",
      });
    }

    return next();
  }

  const requestKey = req.get("x-admin-api-key") || "";

  if (!safeCompare(requestKey, configuredKey)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  return next();
};
