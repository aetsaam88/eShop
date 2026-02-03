"use client";
import { useCart } from "../context/CartContext"; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  // Yahan cartItems aur clearCart ko destructure kiya hai
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  // Total amount calculate karne ke liye (Safe check ke sath)
  const total = cartItems?.reduce((acc, item) => acc + Number(item.price), 0) || 0;

  // Agar cartItems undefined ho ya khali ho
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-slate-800">Aapka cart khali hai!</h2>
        <p className="text-slate-500 mt-2">Shopping shuru karne ke liye niche button par click karein.</p>
        <Link href="/" className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all">
          Go Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen">
      <h1 className="text-3xl font-black text-slate-900 mb-8 border-b pb-4">My Shopping Cart</h1>
      
      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            
            {/* Image aur Title Section */}
            <div className="flex items-center gap-6 w-full sm:w-auto">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl border bg-slate-50">
                <img 
                  src={item.image || "https://via.placeholder.com/150"} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">{item.name}</h3>
                <p className="text-slate-400 text-sm mt-1">In Stock</p>
              </div>
            </div>

            {/* Price aur Remove Button */}
            <div className="flex items-center justify-between sm:justify-end gap-10 w-full sm:w-auto mt-4 sm:mt-0">
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Price</p>
                <p className="text-xl font-black text-blue-600">Rs. {item.price}</p>
              </div>
              
              <button 
                onClick={() => removeFromCart(index)} 
                className="bg-red-50 text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all group"
                title="Remove Item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Summary */}
      <div className="mt-12 bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm font-medium">Grand Total</p>
          <h2 className="text-4xl font-black">Rs. {total}</h2>
        </div>
        
        {/* Is button ko checkout page se link kar diya hai */}
        <button 
          onClick={() => router.push('/checkout')}
          className="mt-6 md:mt-0 w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Place Order Now →
        </button>
      </div>
    </div>
  );
}