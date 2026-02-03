"use client"; // Client logic k liye zaroori hai
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

const Navbar = ({ cartCount = 0 }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check karein ke user login hai ya nahi
  useEffect(() => {
    const admin = localStorage.getItem("isAdmin");
    if (admin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-slate-900 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider">
          <Link href="/">E-SHOP</Link>
        </div>

        {/* Links */}
        <ul className="hidden md:flex space-x-8 font-medium">
          <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
          <li><Link href="/shop" className="hover:text-blue-400 transition">Products</Link></li>
          <li><Link href="/about" className="hover:text-blue-400 transition">About</Link></li>
          <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
        </ul>

        {/* Cart & Actions */}
        <div className="flex items-center space-x-5">
          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative p-2 hover:bg-slate-800 rounded-full transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* --- Dynamic Login/Admin Button --- */}
          <Link href={isLoggedIn ? "/admin" : "/login"}>
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm font-semibold transition text-white shadow-md active:scale-95">
              {isLoggedIn ? "Admin Panel" : "Login"}
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;