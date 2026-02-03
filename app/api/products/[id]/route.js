import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { NextResponse } from "next/server";

// 1. UPDATE Product (PUT Request)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    
    // Next.js 16+ mein params ko await karna zaroori hai
    const { id } = await params; 
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. DELETE Product (DELETE Request)
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    // Yahan await params lagane se ID sahi milegi
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "ID missing in request" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ message: "Product not found in Database" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 3. GET Single Product
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    
    if (!product) return NextResponse.json({ message: "Not found" }, { status: 404 });
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}