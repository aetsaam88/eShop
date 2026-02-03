import connectDB from "../../lib/mongodb";
import Product from "../../models/Product";
import { NextResponse } from "next/server";

// 1. GET Function (Browser par data dikhane ke liye)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error.message);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// 2. POST Function (Form se data save karne ke liye)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newProduct = new Product({
      name: body.name,
      price: Number(body.price),
      description: body.description || "",
      image: body.image || ""
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json({ success: true, data: savedProduct }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}