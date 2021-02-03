import express from "express";

const app = express();

app.get("/api/products", (req, res) => {
   console.log("here");
  res.send({
    _id: "1",
    name: "shirt",
    image: "/images/shirt.webp",
    category: "shirt",
    price: 60,
    brand: "Nike",
    rating: 4.5,
    num_reviews: 10,
  });
});

app.listen(5000, () => {
  console.log("server started at http://localhost:5000");
});
