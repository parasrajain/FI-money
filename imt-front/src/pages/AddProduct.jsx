

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "", // Changed from productName to match backend
//     type: "",
//     sku: "",
//     image_url: "", // Changed from productImageUrl
//     price: 0,
//     quantity: 0,
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // 1. Get auth token from localStorage
//       const authData = JSON.parse(localStorage.getItem("auth")) || {};
//       const token = authData.token;

//       console.log("Token-add:", token);

//       if (!token) {
//         toast.error("Please login first");
//         navigate("/login");
//         return;
//       }

//       // 2. Format data to match backend expectations
//       const requestData = {
//         name: formData.name,
//         type: formData.type,
//         sku: formData.sku,
//         image_url: formData.image_url,
//         price: parseFloat(formData.price),
//         quantity: parseInt(formData.quantity),
//         description: formData.description
//       };

//       // 3. Include Authorization header
//       const res = await fetch("http://localhost:8080/api/products", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify(requestData),
//         credentials: "include"
//       });

//       // 4. Handle 401 responses
//     //   if (res.status === 401) {
//     //     localStorage.removeItem("user");
//     //     navigate("/login");
//     //     return;
//     //   }

//       const data = await res.json();
      
//       if (!res.ok) {
//         throw new Error(data.message || "Failed to add product");
//       }

//       toast.success("Product created!");
//       navigate("/products");
//     } catch (err) {
//       console.error(err);
//       toast.error(err.message || "Failed to add product");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
        
//         {/* Updated field names to match backend */}
//         {["name", "type", "sku", "image_url", "description"].map((name) => (
//           <div className="mb-4" key={name}>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               {name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
//             </label>
//             <input
//               type={name === "image_url" ? "url" : "text"}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               required={name !== "description"}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//         ))}

//         {["price", "quantity"].map((name) => (
//           <div className="mb-4" key={name}>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               {name.charAt(0).toUpperCase() + name.slice(1)}
//             </label>
//             <input
//               type="number"
//               name={name}
//               min="0"
//               step={name === "price" ? "0.01" : "1"}
//               value={formData[name]}
//               onChange={handleChange}
//               required
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
//             />
//           </div>
//         ))}

//         <button 
//           type="submit" 
//           className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    sku: "",
    image_url: "",
    price: 0,
    quantity: 0,
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : 
              name === "quantity" ? parseInt(value) || 0 : 
              value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const authData = JSON.parse(localStorage.getItem("auth")) || {};
      const token = authData.token;

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      toast.success("Product created successfully!");
      navigate("/products");
    } catch (err) {
      toast.error(err.message || "Failed to add product");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Field configurations
  const fields = [
    { name: "name", label: "Product Name", type: "text", required: true },
    { name: "type", label: "Product Type", type: "text", required: true },
    { name: "sku", label: "SKU Code", type: "text", required: true },
    { name: "image_url", label: "Image URL", type: "url", required: false },
    { name: "price", label: "Price", type: "number", min: 0, step: "0.01", required: true },
    { name: "quantity", label: "Quantity", type: "number", min: 0, required: true },
    { name: "description", label: "Description", type: "textarea", required: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Add New Product</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the details below to add a new product to inventory
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={3}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    min={field.min}
                    step={field.step}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </div>
            ))}

            <div className="flex items-center justify-end gap-x-4">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}