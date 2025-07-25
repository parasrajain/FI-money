// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

export default function IsAdmin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5500/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        alert("Logged out successfully");
        navigate("/signin");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during logout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          ➕ Add Product
        </button>
        <button
          onClick={() => navigate("/update-quantity")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          🔄 Update Quantity
        </button>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          📦 View All Products
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}