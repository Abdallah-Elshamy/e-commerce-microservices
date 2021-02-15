import express from "express";
import { OrderRouter } from "./orders/routes/order.router.js";

const router = express.Router();

router.use("/orders", OrderRouter);

router.get("/", async (req, res) => {
  res.send("V0");
});

export const IndexRouter = router;