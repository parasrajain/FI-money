
// import { Link } from "react-router-dom";

// export default function Navbar({ auth, setAuth }) {
//   const handleLogout = () => {
//     localStorage.removeItem("auth"); // Changed from "user" to "auth" to match your auth system
//     setAuth(null);
//   };

//   return (
//     <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold whitespace-nowrap">🛒 Inventory Management Tool</h1>
//       <div className="flex items-center space-x-4">
//         <Link to="/" className="hover:text-yellow-400 whitespace-nowrap">Home</Link>
//         <Link to="/products" className="hover:text-yellow-400 whitespace-nowrap">Products</Link>

//         {auth?.user?.role === "ADMIN" && (  // Changed to auth?.user?.role
//           <>
//             <Link to="/add-product" className="hover:text-yellow-400 whitespace-nowrap">Create</Link>
//             <Link to="/update-quantity" className="hover:text-yellow-400 whitespace-nowrap">Update</Link>
//           </>
//         )}

//         {!auth ? (
//           <>
//             <Link to="/login" className="hover:text-yellow-400 whitespace-nowrap">Login</Link>
//             <Link to="/register" className="hover:text-yellow-400 whitespace-nowrap">Register</Link>
//           </>
//         ) : (
//           <button 
//             onClick={handleLogout} 
//             className="hover:text-red-400 whitespace-nowrap"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }
import { Link } from "react-router-dom";

export default function Navbar({ auth, setAuth }) {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">
                InventoryPro
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Products
              </Link>
              {auth?.user?.role === "ADMIN" && (
                <>
                  <Link
                    to="/add-product"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Create
                  </Link>
                  <Link
                    to="/update-quantity"
                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Update
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!auth ? (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Products
          </Link>
          {auth?.user?.role === "ADMIN" && (
            <>
              <Link
                to="/add-product"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Create
              </Link>
              <Link
                to="/update-quantity"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Update
              </Link>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {!auth ? (
            <div className="mt-3 space-y-1 px-2">
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="mt-3 space-y-1 px-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}