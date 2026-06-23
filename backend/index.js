import express from "express";
import { PORT } from "./config/env.js";
import { connectToDB } from "./config/mongodb.js";

const app = express();

app.listen(PORT, async () => {
    console.log(`Example app listening on port ${PORT}`);

    // Connect to database
    await connectToDB();
});