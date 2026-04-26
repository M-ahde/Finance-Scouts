import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event-covers",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg", "gif"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

const coverUpload = multer({ storage: coverStorage, limits: { fileSize: 10 * 1024 * 1024 } });

export default coverUpload;