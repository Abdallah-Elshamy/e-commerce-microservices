import express from "express";
import { ProductRouter } from "./products/routes/product.router.js";

const router = express.Router();

router.use("/products", ProductRouter);

router.get("/", async (req, res) => {
  res.send("V0");
});

export const IndexRouter = router;