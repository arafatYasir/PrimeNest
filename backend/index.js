import express from "express";
import { PORT } from "./config/env.js";
import { connectToDB } from "./config/mongodb.js";

const app = express();

// Middlewares
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ success: true });
});

app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);

    // Connect to database
    await connectToDB();
});