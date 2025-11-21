import express from "express";
import dotenv from "dotenv";
import { products } from "./data/products";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get all products
app.get("/api/products", (req, res) => {
  console.log("GET /api/products");
  try {
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
