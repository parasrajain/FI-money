// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [userRole, setUserRole] = useState(null);
  

//   const fetchProducts = async () => {
//     try {
//     //   const token = localStorage.getItem('token');
//     const authData = JSON.parse(localStorage.getItem("auth")) || {};
// const token = authData.token;

//       const res = await fetch(`http://localhost:8080/api/products`, {
//         method: "GET",
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         credentials: "include"
//       });
      
//       const data = await res.json();
//     //   console.log('Token here:', token);
//     //   console.log('Response:', res);
//     //   console.log('Data:', data);

//       if (data.success) {
//         toast.success("Products loaded successfully");
//         setProducts(data.data);
//         setUserRole(data.role || "USER");
//       } else {
//         toast.error(data.message || "Failed to fetch products");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error while fetching products");
//     }
//   };

//   const handleQuantityChange = async (id, quantity) => {
//     try {
//       const authData = JSON.parse(localStorage.getItem("auth")) || {};
//       const token = authData.token;

//       const res = await fetch(`http://localhost:8080/api/products/${id}/quantity`, {
//         method: "PUT",
//         headers: { 
//           "Content-Type": "application/json",
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ quantity }),
//         credentials: "include"
//       });
      
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Quantity updated!");
//         fetchProducts();
//       } else {
//         toast.error(data.message || "Update failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Network error during update");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

  

//   return (
    
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">📦 Products</h2>
//       {products.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="bg-white shadow-md rounded p-4">
//               <div className="flex flex-col items-center">
//                 <h1 className="text-3xl font-semibold mb-2">
//                   {product.name}
//                 </h1>
//                 {product.image_url && (
//                   <img 
//                     src={product.image_url}
//                     alt={product.name}
//                     className="w-48 h-48 object-contain"
//                   />
//                 )}
//               </div>
              
//               <p className="text-sm text-gray-600 mb-2">Type: {product.type}</p>
//               <p className="text-sm text-gray-600 mb-2">SKU: {product.sku}</p>
//               <p className="text-sm text-gray-600 mb-2">
//                 Image: {product.image_url ? (
//                   <a href={product.image_url} target="_blank" rel="noopener noreferrer">
//                     View Image
//                   </a>
//                 ) : "No image"}
//               </p>
//               <p className="text-sm text-gray-600 mb-2">Price: ₹{product.price}</p>
//               <p className="text-sm text-gray-600 mb-2">Quantity: {product.quantity}</p>
//               <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              
//               {userRole === "ADMIN" && (
//                 <div className="mt-2">
//                   <input
//                     type="number"
//                     min="0"
//                     placeholder="New Quantity"
//                     className="border rounded px-2 py-1 w-full"
//                     onBlur={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiEdit, FiEye, FiShoppingCart } from "react-icons/fi";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const authData = JSON.parse(localStorage.getItem("auth")) || {};
      const token = authData.token;

      const res = await fetch(`http://localhost:8080/api/products`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: "include"
      });
      
      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
        setUserRole(data.role || "USER");
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 0) {
      toast.error("Quantity cannot be negative");
      return;
    }

    try {
      const authData = JSON.parse(localStorage.getItem("auth")) || {};
      const token = authData.token;

      const res = await fetch(`http://localhost:8080/api/products/${id}/quantity`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity }),
        credentials: "include"
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success("Quantity updated successfully!");
        fetchProducts();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error during update");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <FiShoppingCart className="mr-2" /> Product Inventory
        </h1>
        {userRole === "ADMIN" && (
          <button 
            onClick={() => window.location.href = '/add-product'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiEdit className="mr-2" /> Add New Product
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in inventory</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 text-indigo-600 hover:text-indigo-800"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                {product.image_url ? (
                  <img 
                    src={product.image_url}
                    alt={product.name}
                    className="object-contain h-full w-full p-4"
                  />
                ) : (
                  <div className="text-gray-400">No Image Available</div>
                )}
                <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {product.type}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">SKU: {product.sku}</span>
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description || "No description available"}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium">Qty: </span>
                    <span className={product.quantity < 10 ? "text-red-600" : "text-gray-600"}>
                      {product.quantity}
                    </span>
                    {product.quantity < 10 && (
                      <span className="ml-2 text-xs text-red-500">(Low stock)</span>
                    )}
                  </div>

                  <a 
                    href={product.image_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                  >
                    <FiEye className="mr-1" /> View Image
                  </a>
                </div>

                {userRole === "ADMIN" && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Update Quantity
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        min="0"
                        defaultValue={product.quantity}
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                        onBlur={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                      />
                      <button 
                        className="bg-indigo-600 text-white px-3 py-2 rounded-r-md hover:bg-indigo-700"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling;
                          handleQuantityChange(product._id, parseInt(input.value));
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}