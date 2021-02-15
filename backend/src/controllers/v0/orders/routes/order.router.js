import express from "express";

import Order from "../models/order.js";

import { isAuth, isAdmin } from "../../utils.js";

const PAGE_SIZE = 10;

const router = express.Router();

router.post("/", isAuth, isAdmin, async (req, res) => {
  var order;
  try {
    order = new Order({
      user: req.user,
      orderItems: req.body.orderItems,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    });
  } catch (e) {
    return res.status(422).send({ msg: "Invalid Order Data." });
  }

  try {
    const newOrder = await order.save();
    return res.status(201).send(newOrder);
  } catch (e) {
    return res.status(500).send({ msg: "An error occurred." });
  }
});

router.get("/", isAuth, isAdmin, async (req, res) => {
    try {
      const orders = await Order.find({}, null, {
        skip: ((req.query.page || 1) - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      }).exec();
      res.status(200).send(orders)
    } catch (e) {
      return res.status(500).send({ msg: "An error occurred." });
    }
  });

export const OrderRouter = router;