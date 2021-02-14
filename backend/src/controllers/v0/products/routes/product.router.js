import express from "express";

import Product from "../models/product.js";

import { isAuth, isAdmin } from "../../users/utils.js";

const PAGE_SIZE = 10;

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find({}, null, {
    skip: ((req.query.page || 1) - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
  }).exec();
  res.send(products);
});

// Get a product detail
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    res.status(200).send(product);
  } catch (e) {
    res.status(404).send({ msg: "Product not found." });
  }
});

// add a product
// only available if you are an admin
router.post("/", isAuth, isAdmin, async (req, res) => {
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

// edit a product
// only available if you are an admin
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  var product = null;
  try {
    product = await Product.findById(req.params.id).exec();
  } catch (e) {
    return res.status(404).send({ msg: "Product not found." });
  }
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
  }
  try {
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res.status(201).send(updatedProduct);
    }
  } catch (e) {
    return res.status(500).send({ msg: "An error occurred." });
  }
});

// Delete a product detail
// only available if you are an admin
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  var deletedProduct = null;
  try {
    deletedProduct = await Product.findById(req.params.id).exec();
  } catch (e) {
    return res.status(404).send({ msg: "Product not found." });
  }

  try {
    await deletedProduct.remove();
    return res.status(200).send({msg: "Product was deleted"});
  } catch (e) {
    return res.status(500).send({ msg: "An error occurred." });
  }
});

export const ProductRouter = router;
