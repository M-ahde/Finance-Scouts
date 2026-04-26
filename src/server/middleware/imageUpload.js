import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event-logos",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg", "gif"],
    transformation: [{ width: 400, height: 400, crop: "limit" }],
  },
});

const imageUpload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

export default imageUpload;