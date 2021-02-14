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
  const product = Product.findById(req.params.id).exec();

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product not found." });
  }
});

export const ProductRouter = router;
