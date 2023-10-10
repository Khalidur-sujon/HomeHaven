//external imports
import express from "express";
import dotenv from "dotenv";

// internal imports
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middware/errorMiddleware.js";

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

const PORT = 3000;

app.listen(3000, () => console.log("Server is running on port:", PORT));

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//error handler
app.use(errorHandler);
