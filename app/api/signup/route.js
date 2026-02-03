import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // Check karein ke user pehle se to nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const newUser = await User.create({ name, email, password });
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}