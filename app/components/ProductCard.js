"use client";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded-xl shadow">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
      <h2 className="font-bold">{product.name}</h2>
      <p>${product.price}</p>
      <button 
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}