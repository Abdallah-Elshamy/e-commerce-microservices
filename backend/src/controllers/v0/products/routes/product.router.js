import express from "express";

import Product from "../models/product.js";

import { isAuth, isAdmin } from "../../users/utils.js";

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

// add a product
// only available if you are an admin
router.post("/", isAuth, isAdmin,async (req, res) => {
  var product;
  try {
    product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
  } catch (e) {
    return res.status(422).send({ msg: "Invalid Product Data." });
  }
  try {
    const newProduct = await product.save();
    if (newProduct) {
      return res.status(201).send(newProduct);
    }
  } catch (e) {
    return res.status(500).send({ msg: "An error occurred." });
  }
});

export const ProductRouter = router;
