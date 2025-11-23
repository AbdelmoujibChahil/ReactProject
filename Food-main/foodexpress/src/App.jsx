import React, { useEffect } from "react";
import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import CartPage from "./pages/Cart/Cart";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import CheckoutPage from "./pages/Checkout/Checkout";
import PaymentPage from "./pages/Payment/Payment"; // ✅ NEW IMPORT
import ProfilePage from "./pages/Profile/Profile";
import ProfileMain from "./pages/Profile/ProfileMain";
import AccountPage from "./pages/Profile/AccountPage";
import OrdersPage from "./pages/Profile/OrdersPage";
import ChangePasswordForm from "./pages/Profile/ChangePasswordForm";
import Contact from "./pages/Contact/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext"; // ✅ NEW IMPORT
import Navbar from "./components/Navbar/Navbar";
import ConditionalFooter from "./components/ConditionalFooter";
import Notification from "./components/Notification/Notification"; // ✅ NEW IMPORT

/**
 * Utility component to scroll to top on page change
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * Protected Route Component
 * Protects routes that require authentication
 */


/**
 * Main App Component
 */
function App() {
   return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <div className="app-container">
              <Navbar />
              <Notification />
              <ScrollToTop />
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <PaymentPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfileMain />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/account"
                    element={
                      <ProtectedRoute>
                        <AccountPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/orders"
                    element={
                      <ProtectedRoute>
                        <OrdersPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/change-password"
                    element={
                      <ProtectedRoute>
                        <ChangePasswordForm />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <ConditionalFooter />
            </div>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;