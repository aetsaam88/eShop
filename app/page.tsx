"use client";
import { useEffect, useState } from 'react';
import { useCart } from './context/CartContext'; 

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products ke liye
  const [searchTerm, setSearchTerm] = useState(""); // Search text store karne ke liye
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const productList = Array.isArray(data) ? data : [];
        setProducts(productList);
        setFilteredProducts(productList); // Shuru mein saari products dikhao
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Search logic: Jab bhi searchTerm badle, list update ho
  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  if (loading) return <div className="text-center p-20">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-10">
      
      {/* --- Search Input Section --- */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <input 
            type="text"
            placeholder="Search products by name..."
            className="w-full p-4 pl-12 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-4 text-slate-400">
            🔍
          </span>
        </div>
        {searchTerm && (
          <p className="text-sm text-slate-500 mt-2 ml-2">
            Found {filteredProducts.length} results for "{searchTerm}"
          </p>
        )}
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full group">
              <img src={product.image} className="w-full h-56 object-cover" alt={product.name} />
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <div className="mt-auto flex justify-between items-center pt-4">
                  <span className="text-xl font-black text-blue-600">Rs. {product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-slate-400">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}