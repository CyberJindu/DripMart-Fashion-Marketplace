import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./pages/vendor/DashboardLayout";
import VendorProfile from "./pages/vendor/Profile";
import AddProduct from "./pages/vendor/AddProduct";
import VendorOrders from "./pages/vendor/Orders";
import Payments from "./pages/vendor/Payments";
import Reviews from "./pages/vendor/Reviews";
import Products from "./pages/vendor/Products";


import CustomerLayout from "./pages/customer/DashboardLayout";
import CustomerHome from "./pages/customer/Home";
import CustomerCart from "./pages/customer/Cart";
import CustomerOrders from "./pages/customer/Orders";
import CustomerProfile from "./pages/customer/Profile";

import CardDetails from "./pages/customer/CardDetails";
import Payment from "./pages/customer/Payment";
import ProductDetail from "./pages/customer/ProductDetail";
import ReviewForm from "./pages/customer/ReviewForm";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Wrapper for protecting routes
function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-brand-white text-brand-black">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Vendor Dashboard (Protected) */}
                <Route
                  path="/vendor"
                  element={
                    <PrivateRoute role="vendor">
                      <DashboardLayout />
                    </PrivateRoute>
                  }
                >
                  <Route path="Profile" element={<VendorProfile />} />
                  <Route path="Products" element={<Products />} />
                  <Route path="AddProduct" element={<AddProduct />} />
                  <Route path="Orders" element={<VendorOrders />} />
                  <Route path="Payments" element={<Payments />} />
                  <Route path="Reviews" element={<Reviews />} />
                </Route>

                {/* Customer Dashboard (Protected) */}
                <Route
                  path="/customer"
                  element={
                    <PrivateRoute role="customer">
                      <CustomerLayout />
                    </PrivateRoute>
                  }
                >
                  <Route path="Home" element={<CustomerHome />} />
                  <Route path="Cart" element={<CustomerCart />} />
                  <Route path="orders" element={<CustomerOrders />} />
                  <Route path="Profile" element={<CustomerProfile />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="review/:productId" element={<ReviewForm />} />
                </Route>

                {/* Checkout Flow (Customer only) */}
                <Route
                  path="/customer/CardDetails"
                  element={
                    <PrivateRoute role="customer">
                      <CardDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/customer/Payment"
                  element={
                    <PrivateRoute role="customer">
                      <Payment />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
