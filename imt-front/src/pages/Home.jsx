
// // eslint-disable-next-line no-unused-vars
// import React from "react";

// export default function Home() {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">🛍️  Welcome to Chirag Store</h1>
        
//         <p className="text-lg text-gray-600">Simple & Secure Product Management tool</p>
//         <p className="text-lg text-gray-600">(Click on Product page)</p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Welcome to <span className="text-blue-600">My Shop</span> 🛍️
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your simple, secure, and powerful product management solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate("/products")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-md"
              >
                Explore Products
              </button>
              <button 
                onClick={() => navigate("/login")}
                className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Admin Login
              </button>
            </div>
          </div>
          <div className="md:w-1/2 bg-blue-600 flex items-center justify-center p-8">
            <div className="relative w-full h-64 md:h-full">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80')] bg-cover bg-center opacity-20 rounded-lg"></div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 className="text-2xl font-bold mb-2">Effortless Inventory</h2>
                <p className="text-blue-100">Manage your products with ease and precision</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Secure</h3>
          <p className="text-gray-600">Bank-grade security for all your product data</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Fast</h3>
          <p className="text-gray-600">Lightning quick operations and navigation</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <div className="text-blue-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Cloud-Based</h3>
          <p className="text-gray-600">Access your inventory from anywhere, anytime</p>
        </div>
      </div>
    </div>
  );
}