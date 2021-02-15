import express from "express";

import Order from "../models/order.js";

import { isAuth, isAdmin } from "../../utils.js";

const PAGE_SIZE = 10;

const router = express.Router();


export const OrderRouter = router;