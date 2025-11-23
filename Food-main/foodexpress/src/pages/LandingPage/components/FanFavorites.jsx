import React from "react";
import "./FanFavorites.css";
import { foodData } from "../../../data/foodData";
import { useCart } from "../../../context/CartContext";

const FanFavorites = ({ onViewMenu }) => {
  const { addToCart } = useCart();

  // Select top 6 most recommended items (by rating and review count)
  const favorites = [...foodData]
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    })
    .slice(0, 6);

  return (
    <section className="fan-favorites landing-section">
      <div className="landing-container">
        <h2 className="section-title">This Week's Fan Favorites</h2>
        <p className="section-subtitle">
          Our most loved dishes, ordered by people just like you.
        </p>

        <div className="favorites-scroll-container">
          <div className="favorites-grid">
            {favorites.map((item) => (
              <div key={item.id} className="favorite-item-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="favorite-item-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Food+Item";
                  }}
                />
                <div className="favorite-item-info">
                  <p className="favorite-item-name">{item.name}</p>

                  {/* Rating Display */}
                  <div className="favorite-item-rating">
                    <span className="rating-star">⭐</span>
                    <span className="rating-value">{item.rating}</span>
                    <span className="rating-count">({item.reviewCount})</span>
                  </div>

                  <div className="favorite-item-details">
                    <p className="favorite-item-price">
                      ${item.price.toFixed(2)}
                    </p>
                    <button
                      className="favorite-item-add-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="favorites-cta">
          <button className="view-full-menu-button" onClick={onViewMenu}>
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default FanFavorites;