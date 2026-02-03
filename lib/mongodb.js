import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: { 
      type: String, 
      required: [true, "Naam likhna zaroori hai"] 
    },
    email: { 
      type: String, 
      required: false,
      default: "no-email@store.com"
    },
    phone: { 
      type: String, 
      required: [true, "Phone number zaroori hai"] 
    },
    address: { 
      type: String, 
      required: [true, "Address likhna zaroori hai"] 
    },
    // Cart ke items ki list
    cartItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { 
      type: Number, 
      required: true 
    },
    status: { 
      type: String, 
      default: "Pending",
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
  },
  { timestamps: true } // Is se order ka time aur date khud save ho jayegi
);

// Model check karein agar pehle se bana hai to wahi use karein, warna naya banayein
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;