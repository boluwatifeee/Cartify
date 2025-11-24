import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Connect to database (non-blocking)
connectDB();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Means that anytime we hit /api/products, we will use the productRoutes
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
