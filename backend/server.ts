import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import cookieParser from "cookie-parser";
import orderRoutes from "./routes/orderRoutes";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const port = process.env.PORT || 5000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Connect to database (non-blocking)
connectDB();

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Means that anytime we hit /api/products, we will use the productRoutes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
