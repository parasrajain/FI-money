// import React from "react";
// import {
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Signup.jsx";
// import Products from "./pages/Products.jsx";
// import AddProduct from "./pages/AddProduct.jsx";
// import UpdateQuantity from "./pages/UpdateQuantity.jsx";
// import Navbar from "./components/Navbar.jsx";

// export default function App() {
//   const [auth, setAuth] = React.useState(() => {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   });

//   return (
//       <div className="min-h-screen bg-gray-50">
//         <ToastContainer position="top-center" autoClose={2000} />
//         <Navbar auth={auth} setAuth={setAuth} />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/login"
//             element={auth ? <Navigate to="/products" /> : <Login setAuth={setAuth} />}
//           />
//           <Route
//             path="/register"
//             element={auth ? <Navigate to="/products" /> : <Register />} 
//           />
//           <Route
//             path="/products"
//             element={auth? <Products/> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/add-product"
//             element={auth?.role === "ADMIN" ? <AddProduct /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/product/:id/quantity"
//             element={auth?.role === "ADMIN" ? <UpdateQuantity /> : <Navigate to="/" />}
//           />
//         </Routes>
//       </div>
//   );
// }

import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Signup.jsx";
import Products from "./pages/Products.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UpdateQuantity from "./pages/UpdateQuantity.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const [auth, setAuth] = React.useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={auth ? <Navigate to="/products" /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/register"
          element={auth ? <Navigate to="/products" /> : <Register />} 
        />
        <Route
          path="/products"
          element={auth ? <Products/> : <Navigate to="/login" />}
        />
        <Route 
          path="/add-product"
          // element={auth?.userData?.role === "ADMIN" ? <AddProduct /> : <Navigate to="/" />}
          element={<AddProduct />}
        />
        <Route
          path="/update-quantity"
          element={auth?.userData?.role === "ADMIN" ? <UpdateQuantity /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}