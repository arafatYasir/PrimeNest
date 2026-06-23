import mongoose from "mongoose";
import { DB_URI } from "./env.js";

export async function connectToDB() {
    if (!DB_URI) {
        throw new Error("DB_URI is required in environment variables");
    }

    try {
        await mongoose.connect(DB_URI);

        console.log("---------- Database Connected ----------");
    } catch (e) {
        console.error("MongoDB connection error: ", e.message);
        process.exit(1);
    }
}