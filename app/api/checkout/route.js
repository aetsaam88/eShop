import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";
import { NextResponse } from 'next/server';

// 1. Order Save karne ke liye (Jab user checkout form submit kare)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newOrder = await Order.create(body);
    return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// 2. Orders Dekhne ke liye (Admin Dashboard ke liye)
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }); // Newest first
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}