import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";
import { getProductById, getProducts } from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
export default router;
