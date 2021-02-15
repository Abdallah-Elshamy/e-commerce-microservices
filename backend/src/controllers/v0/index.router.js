import express from "express";
import { ProductRouter } from "./products/routes/product.router.js";
import { UserRouter } from "./users/routes/user.router.js";
import { OrderRouter } from "./orders/routes/order.router.js";

const router = express.Router();

router.use("/products", ProductRouter);
router.use("/users", UserRouter);
router.use("/orders", OrderRouter);

router.get("/", async (req, res) => {
  res.send("V0");
});

export const IndexRouter = router;