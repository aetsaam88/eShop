import connectDB from "../../lib/mongodb";
import Order from "../../models/Order";
import { NextResponse } from "next/server";

// 1. GET: Admin Dashboard ke liye orders fetch karna
export async function GET() {
  try {
    await connectDB();
    // Latest orders sab se pehle dikhane ke liye sorting
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET Orders Error:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. POST: Checkout page se naya order save karna
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Terminal mein data check karne ke liye (Debugging)
    console.log("Aane wala data:", body);

    // Order create karna
    const newOrder = await Order.create(body);
    
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Database Error (POST):", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}