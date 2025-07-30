// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function UpdateQuantity() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}/quantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ quantity: Number(quantity) }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Quantity updated successfully");
        setProductId("");
        setQuantity("");
      } else {
        alert(data.message || "Failed to update quantity");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Product Quantity</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product ID</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter Product ID"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter New Quantity"
          />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full">
          Update Quantity
        </button>
      </form>
    </div>
  );
}