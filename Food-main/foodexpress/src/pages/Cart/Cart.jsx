import React from 'react';
import './Cart.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart, submitCommande, cartCount } = useCart();
  const { isLoggedIn, user } = useAuth(); // Ajoute user pour avoir l'ID client
  const navigate = useNavigate();

  // Calculate totals - CORRECTION ICI
  const subtotal = cartItems.reduce((acc, item) => acc + (item.plat.prix * item.quantite), 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  // Fonction pour gérer la commande
  const handleCheckout = async () => {
    if (isLoggedIn && user) {
      try {
        // ⭐⭐ CORRECTION ICI : Passer l'ID client à submitCommande
        await submitCommande(user.id); // user.id = client_id pour Laravel
        navigate('/checkout-success'); // Rediriger vers une page de confirmation
      } catch (error) {
        alert('Erreur lors de la commande: ' + error.message);
      }
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  // Function to remove an item completely - CORRECTION ICI
  const handleRemoveItem = (item) => {
    // Utiliser plat_id au lieu de id
    let currentQuantite = item.quantite;
    for(let i = 0; i < currentQuantite; i++) {
      removeFromCart(item.plat_id); // ⬅️ CORRECTION
    }
  }

  return (
    <div className="cart-page-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-items-list">
          {cartCount === 0 ? (
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/" className="cart-empty-link">Start Shopping</Link>
            </div>
          ) : (
            // ⭐⭐ CORRECTION : Utiliser la nouvelle structure cartItems
            cartItems.map((item) => (
              <div key={item.plat_id} className="cart-item"> {/* Utiliser plat_id comme key */}
                <img src={item.plat.image} alt={item.plat.nom} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.plat.nom}</span>
                  {/* ⭐⭐ CORRECTION : Accéder au prix via item.plat.prix */}
                  <span className="cart-item-price">${(item.plat.prix * item.quantite).toFixed(2)}</span>
                </div>
                <div className="cart-item-actions">
                  {/* ⭐⭐ CORRECTION : Utiliser plat_id pour removeFromCart */}
                  <button className="cart-action-btn" onClick={() => removeFromCart(item.plat_id)}>
                    <FaMinus />
                  </button>
                  <span className="cart-item-quantite">{item.quantite}</span>
                  {/* ⭐⭐ CORRECTION : Passer item.plat à addToCart */}
                  <button className="cart-action-btn" onClick={() => addToCart(item.plat)}>
                    <FaPlus />
                  </button>
                  <button className="cart-remove-btn" onClick={() => handleRemoveItem(item)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartCount > 0 && (
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-line">
              <span>Subtotal ({cartCount} {cartCount > 1 ? 'items' : 'item'})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;