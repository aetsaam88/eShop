import mongoose from "mongoose";

// 1. Schema Define karein
const ProductSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Product name is required"],
      trim: true // Extra spaces remove karne ke liye
    },
    price: { 
      type: Number, 
      required: [true, "Price is required"] 
    },
    quantity: { 
      type: Number, 
      required: [true, "Quantity is required"],
      default: 0 
    },
    image: { 
      type: String, 
      required: [true, "Image is required"] 
    }, // Isme Base64 data ya URL dono save ho saktay hain
  },
  { 
    timestamps: true // Is se createdAt aur updatedAt khud ban jayenge
  }
);

// 2. Model Export Logic
// Next.js mein check karna zaroori hota hai ke model pehle se register toh nahi
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;