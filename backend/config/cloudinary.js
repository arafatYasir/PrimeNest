import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } from "./env.js"

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_secret: CLOUDINARY_API_SECRET,
    api_key: CLOUDINARY_API_KEY
});

export default cloudinary;