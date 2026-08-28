import { config } from "dotenv";

config({ path: ".env" });

export const {
    NODE_ENV,
    PORT,
    DB_URI,
    SITE_URL,
    BACKEND_URL,
    CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SIGNING_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY
} = process.env;

export const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || SITE_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);