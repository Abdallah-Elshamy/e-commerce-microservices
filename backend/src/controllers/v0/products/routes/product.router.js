import express from "express";

import Product from "../models/product.js";

const PAGE_SIZE = 10;

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  products = await Product.find({}, null, {
    skip: ((req.query.page || 1) - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  }).exec();
  res.send(products);
});

// Get a product detail
router.get("/:id", (req, res) => {
  res.send({
    _id: "1",
    name: "shirt",
    image: "/images/shirt.webp",
    category: "shirt",
    price: 60,
    brand: "Nike",
    rating: 4.5,
    num_reviews: 10,
    countInStock: 6,
  });
});

export const ProductRouter = router;
