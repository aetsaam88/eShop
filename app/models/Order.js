import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;