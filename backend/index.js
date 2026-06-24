import express from "express";
import { NODE_ENV, PORT, SITE_URL } from "./config/env.js";
import { connectToDB } from "./config/mongodb.js";
import cors from "cors";
import healthRouter from "./routes/health.route.js";
import propertiesRouter from "./routes/properties.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import job from "./lib/cron.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: SITE_URL
}));

// Routes
app.use("/health", healthRouter);
app.use("/properties", propertiesRouter);

// Global error handler
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);

    // Connect to database
    await connectToDB();

    // If app is in production run the cron job
    if (NODE_ENV === "production") {
        job.start();
    }
});