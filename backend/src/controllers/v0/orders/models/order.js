import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const paymentSchema = new mongoose.Schema({
  paymentMethod: { type: String, required: true },
});

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, default: 0, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [orderItemSchema],
  shipping: shippingSchema,
  payment: paymentSchema,
  itemsPrice: { type: Number, default: 0, required: true },
  shippingPrice: { type: Number, default: 0, required: true },
  taxPrice: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
