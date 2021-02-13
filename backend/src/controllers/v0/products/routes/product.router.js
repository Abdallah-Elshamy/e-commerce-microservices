import express from "express";

const router = express.Router();

// Get all products
router.get("/", (req, res) => {
  res.send([
    {
      _id: "1",
      name: "shirt",
      image: "/images/shirt.webp",
      category: "shirt",
      price: 60,
      brand: "Nike",
      rating: 4.5,
      num_reviews: 10,
      countInStock:6,
    },
  ]);
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
    countInStock:6,
  });
});

export const ProductRouter = router;
