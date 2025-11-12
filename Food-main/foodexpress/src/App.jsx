

//const [count, setCount] = useState(0);
import React from "react";
import "./index.css"; // Import our global styles
import Home from "./pages/Home/Home"; // Import our new Home page
import CartPage from "./pages/Cart/Cart"; // Import the Cart page

// *** NEW *** Import all the pieces we need
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./context/AuthContext"; // Import the Provider
import { CartProvider } from "./context/CartContext"; // Import the Provider
import Navbar from "./components/Navbar/Navbar"; // Import the Navbar
import Footer from "./components/Footer/Footer"; // Import the Footer
import ConditionalFooter from "./components/ConditionalFooter"
/**
 * This is the main App component.
 * It sets up our "brains" (Providers) and our "layout" (Router, Navbar, Footer).
 */

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the location they were
    // trying to go to. This is the logic we planned!
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

function App() {
  return (
    // *** NEW *** Wrap everything in the Providers and Router
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            
            {/* *** NEW *** 1. The Navbar is now here, outside the Routes */}
            <Navbar />

            {/* *** NEW *** <main> tag holds the changing page content */}
            <main>
              <Routes>
                {/* If the URL is "/", show the Home page */}
                <Route path="/" element={<Home />} />

                {/* If the URL is "/cart", show the CartPage */}
                <Route path="/cart" element={<CartPage />} />

                {/* If the URL is "/login", show the LoginPage */}
                <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
                
                {/* We can add our other routes here later */}

              </Routes>
            </main>

            {/* *** NEW *** 3. The Footer is now here, outside the Routes */}
            <ConditionalFooter />

          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;