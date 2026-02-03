import { NextResponse } from "next/server";

// Aapki 3 Fixed Emails aur Passwords
const ADMIN_USERS = [
  { email: "admin1@eshop.com", password: "admin123" },
  { email: "admin2@eshop.com", password: "admin123" },
  { email: "admin3@eshop.com", password: "admin123" }
];

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. Check karein ke email aur password list mein match hotay hain ya nahi
    const user = ADMIN_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Agar match ho jaye
      return NextResponse.json({ 
        success: true, 
        message: "Login successful!",
        user: { email: user.email }
      });
    } else {
      // Agar match na ho
      return NextResponse.json(
        { message: "Ghalat Email ya Password! Sirf authorized admins allow hain." }, 
        { status: 401 }
      );
    }

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}