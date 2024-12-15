import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();

// Connect to the database
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// Check if the environment variables are loaded correctly
console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
