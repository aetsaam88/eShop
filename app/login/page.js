"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. API Call to check credentials
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 2. Session set karein (Next.js 16+ redirection se pehle storage confirm karein)
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userEmail", formData.email);
        
        // 3. Chota sa delay taakay browser storage update kar le
        setTimeout(() => {
          router.push("/admin");
        }, 100);
      } else {
        alert(data.message || "Aap admin nahi hain ya details ghalat hain.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error! Connection check karein.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-6">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-slate-100">
        <h1 className="text-4xl font-black text-center mb-2 text-slate-900 tracking-tight">
          E-SHOP
        </h1>
        <p className="text-center text-slate-500 mb-8 font-medium">
          Admin Portal Login
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1 mb-1">Admin Email</label>
            <input
              type="email"
              placeholder="admin@eshop.com"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full p-4 border border-slate-200 rounded-2xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-black"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl active:scale-95 disabled:bg-slate-400 mt-4"
          >
            {loading ? "Verifying..." : "Login to Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm italic">
            Authorized access only. Private admin area.
          </p>
        </div>
      </div>
    </div>
  );
}