"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products'); // 'products' ya 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '', image: '' });

  // 1. Security Check & Initial Fetch
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
      fetchProducts();
      fetchOrders();
    }
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) { console.error("Fetch error:", error); }
    finally { setLoading(false); }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) { console.error("Orders error:", error); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setFormData({ ...formData, image: reader.result }); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(editingId ? "✅ Product Updated!" : "✅ Product Saved!");
        setFormData({ name: '', price: '', quantity: '', image: '' });
        setEditingId(null);
        fetchProducts();
      }
    } catch (error) { alert("Error saving product."); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
        alert("🗑️ Deleted!");
      }
    } catch (error) { alert("Delete failed."); }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setFormData({ name: product.name, price: product.price, quantity: product.quantity, image: product.image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isAuthorized) return null;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <div className="flex gap-4 mt-2">
              <button 
                onClick={() => setActiveTab('products')}
                className={`text-sm font-bold ${activeTab === 'products' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
              > Inventory </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`text-sm font-bold ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
              > Customer Orders ({orders.length}) </button>
            </div>
          </div>
          <button onClick={() => {sessionStorage.removeItem("isLoggedIn"); router.push("/login");}} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95 transition">Logout</button>
        </div>

        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Form */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit sticky top-6">
              <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                {editingId ? "Edit Product" : "New Product"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Product Name" required className="w-full p-4 border rounded-2xl bg-slate-50 text-black" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="number" placeholder="Price (Rs.)" required className="w-full p-4 border rounded-2xl bg-slate-50 text-black" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                <input type="number" placeholder="Quantity" required className="w-full p-4 border rounded-2xl bg-slate-50 text-black" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-xs text-slate-500 file:bg-blue-50 file:rounded-lg file:border-0 file:px-4 file:py-2" />
                {formData.image && <img src={formData.image} className="w-full h-32 object-cover rounded-xl mt-2" alt="Preview" />}
                <button type="submit" className={`w-full py-4 rounded-2xl text-white font-bold shadow-lg ${editingId ? 'bg-orange-500' : 'bg-blue-600'}`}>
                  {editingId ? "Update Product" : "Publish Product"}
                </button>
              </form>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
                  <tr><th className="p-5">Product</th><th className="p-5">Price</th><th className="p-5">Stock</th><th className="p-5">Action</th></tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50">
                      <td className="p-5 flex items-center gap-3">
                        <img src={p.image || "/placeholder.png"} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-bold text-slate-800">{p.name}</span>
                      </td>
                      <td className="p-5 font-bold">Rs. {p.price}</td>
                      <td className="p-5 text-slate-500">{p.quantity}</td>
                      <td className="p-5 flex gap-2">
                        <button onClick={() => startEdit(p)} className="text-blue-600 font-bold p-2 bg-blue-50 rounded-lg">Edit</button>
                        <button onClick={() => handleDelete(p._id)} className="text-red-500 font-bold p-2 bg-red-50 rounded-lg">Del</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Orders Section */
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b">
                <tr><th className="p-5">Customer</th><th className="p-5">Details</th><th className="p-5">Items</th><th className="p-5">Total</th><th className="p-5">Status</th></tr>
              </thead>
              <tbody className="divide-y text-sm">
                {orders.map((o) => (
                  <tr key={o._id} className="hover:bg-slate-50">
                    <td className="p-5 font-bold text-slate-900">{o.customerName}</td>
                    <td className="p-5 text-xs text-slate-500">{o.phone}<br/>{o.address}</td>
                    <td className="p-5 text-xs italic">
                      {o.cartItems?.map((item, idx) => (
                        <div key={idx}>{item.name} (x{item.quantity})</div>
                      ))}
                    </td>
                    <td className="p-5 font-black text-blue-600">Rs. {o.totalAmount}</td>
                    <td className="p-5">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-[10px] font-black">{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {orders.length === 0 && <p className="p-10 text-center text-slate-400">No orders found.</p>}
          </div>
        )}
      </div>
    </div>
  );
}