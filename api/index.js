//external imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// internal imports
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import listingRoutes from "./routes/listing.route.js";
import { errorHandler } from "./middware/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

dotenv.config();
connectDB();

const PORT = 3000;

app.listen(3000, () => console.log("Server is running on port:", PORT));

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);

//error handler
app.use(errorHandler);
