"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext'; // Agar checkout folder app ke andar hai

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [details, setDetails] = useState({ name: '', address: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Price calculation
  const total = cartItems.reduce((acc, item) => acc + (Number(item.price) * (item.quantity || 1)), 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("⚠️ Aapka cart khali hai. Pehle kuch items add karein!");
      return;
    }
    
    setLoading(true);

    const orderData = {
      customerName: details.name,
      email: details.email || "no-email@store.com", 
      address: details.address,
      phone: details.phone,
      cartItems: cartItems.map(item => ({
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity || 1
      })),
      totalAmount: total
    };

    try {
      // API call to our merged orders route
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        alert("✅ Order Placed Successfully!");
        if (clearCart) clearCart(); // Context se cart khali karna
        router.push('/'); // Home page par redirect
      } else {
        alert("❌ Order Fail: " + (result.error || "Server issue"));
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("❌ Connection Error: Internet check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-2xl">
      <h1 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">Checkout</h1>
      
      <form onSubmit={handleOrder} className="bg-white p-8 border border-slate-100 rounded-[2rem] shadow-xl space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
          <input 
            type="text" required placeholder="John Doe"
            className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white text-black outline-blue-500 transition-all"
            onChange={(e) => setDetails({...details, name: e.target.value})}
          />
        </div>

        {/* Phone & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Phone Number</label>
            <input 
              type="text" required placeholder="03XXXXXXXXX"
              className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white text-black outline-blue-500 transition-all"
              onChange={(e) => setDetails({...details, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email (Optional)</label>
            <input 
              type="email" placeholder="example@mail.com"
              className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white text-black outline-blue-500 transition-all"
              onChange={(e) => setDetails({...details, email: e.target.value})}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Shipping Address</label>
          <textarea 
            required placeholder="Full address with city"
            className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:bg-white text-black outline-blue-500 transition-all h-28"
            onChange={(e) => setDetails({...details, address: e.target.value})}
          ></textarea>
        </div>
        
        {/* Order Summary */}
        <div className="pt-6 border-t border-slate-100 mt-6">
          <div className="flex justify-between items-center text-xl font-black mb-6">
            <span className="text-slate-500">Total Payable:</span>
            <span className="text-blue-600">Rs. {total}</span>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || cartItems.length === 0}
            className={`w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-95 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? "Placing Order..." : "Confirm Order (Cash on Delivery)"}
          </button>
        </div>
      </form>
    </div>
  );
}