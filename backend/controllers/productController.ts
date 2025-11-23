import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

// Fetch all products: GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Fetch a product by id: GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
