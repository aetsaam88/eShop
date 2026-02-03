"use client";
import { useEffect, useState } from 'react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/checkout') // Orders fetch karne ke liye API
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Customer Orders</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order.customerName} <br/> <span className="text-xs">{order.phone}</span></td>
              <td className="border p-2">
                {order.items.map(item => item.name).join(', ')}
              </td>
              <td className="border p-2">Rs. {order.totalAmount}</td>
              <td className="border p-2 text-blue-600 font-bold">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}