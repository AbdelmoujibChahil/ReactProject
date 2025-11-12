import React, { useState } from "react";
import "./Navbar.css"; // Importing the CSS file as planned
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

// --- SVGs to replace react-icons ---
// In your real project, you can install react-icons (npm install react-icons)
// and uncomment these lines:
// import { FaUserCircle } from 'react-icons/fa';
// import { FiMenu, FiX } from 'react-icons/fi';

// These are included directly to prevent preview errors

// --- SVGs for Navbar Icons ---
const FaUserCircle = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    className="profile-icon"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
    <path
      fillRule="evenodd"
      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
    ></path>
  </svg>
);
const FiMenu = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const FiX = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const CartIconSVG = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="m1 1 4 4h15l-1 7H6"></path>
  </svg>
);

// --- Navbar Component ---
const Navbar = () => {
  const { cartCount } = useCart();
  const { isLoggedIn } = useAuth();
  const [username] = useState('James'); // Placeholder
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // *** THIS IS THE NEW, CORRECTED SCROLL FUNCTION ***
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false); 
    
    // This is the "helper function" that does the scrolling
    const doScroll = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        const yOffset = -80; // This is our --navbar-height
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
    
    // Check if we are on the Home page
    if (window.location.pathname !== '/') {
      // If not, navigate to home and then scroll
      navigate('/');
      // Use setTimeout to allow the page to change
      setTimeout(doScroll, 100); // 100ms delay
    } else {
      // If already on Home, just scroll
      doScroll();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="FoodExpress Logo" />
        </Link>
        <div className="navbar-mobile-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
        <ul className={menuOpen ? "navbar-links active" : "navbar-links"}>
          <li><a onClick={(e) => handleScroll(e, 'offers')}>Offers</a></li>
          <li><a onClick={(e) => handleScroll(e, 'menu')}>Menu</a></li>
          <li><a onClick={(e) => handleScroll(e, 'contact')}>Contact</a></li>
        </ul>
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            {/*<CartIconSVG />*/}
            <img
              src="/src/assets/icons/cart.svg"
              alt="Shopping Cart"
              className="cart-icon"
            />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>
          {isLoggedIn ? (
            <Link to="/profile" className="navbar-profile-btn">
              <FaUserCircle />
              <span>{username}</span>
            </Link>
          ) : (
            <Link to="/login" className="navbar-signin-btn">
              <FaUserCircle />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
