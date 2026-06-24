import { config } from "dotenv";

config({ path: ".env" });

export const { NODE_ENV, PORT, DB_URI, SITE_URL, BACKEND_URL } = process.env;