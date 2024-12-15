import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
dotenv.config();

// Connect to the database
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// Check if the environment variables are loaded correctly
console.log("Environment Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

//apis
app.use("/api/v1/user", userRoute); //middleware

app.get("/home",(_,res)=>{
    res.status(200).json({
        success:true,
        message:"Hello I am Coming from backend"
    })
})
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
