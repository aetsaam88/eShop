"use client";
import { useState } from 'react';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product saved successfully!");
        setFormData({ name: '', price: '', description: '', image: '' }); // Form clear karein
      } else {
        alert("Failed to save product.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Add New Product</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Product Name" required
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            value={formData.name}
          />
          <input 
            type="number" placeholder="Price" required
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            value={formData.price}
          />
          <textarea 
            placeholder="Description" rows={4}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            value={formData.description}
          />
          <input 
            type="text" placeholder="Image URL (e.g. https://...)"
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            value={formData.image}
          />
          
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}