import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ProfileMain.css";

// Icons
const AccountIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const OrdersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ProfileMain = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get first letter of username for avatar
  const getInitial = () => {
    return user?.username ? user.username.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="profile-main">
      <div className="profile-main-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">{getInitial()}</div>
          <h2 className="profile-username">{user?.username || "User"}</h2>
          <nav className="profile-breadcrumb">
            <span className="breadcrumb-current">Profile</span>
          </nav>
        </div>

        {/* Main Navigation Cards */}
        <div className="profile-cards">
          {/* Account Card */}
          <div
            className="profile-card"
            onClick={() => navigate("/profile/account")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/profile/account");
              }
            }}
          >
            <div className="card-content">
              <div className="card-icon">
                <AccountIcon />
              </div>
              <div className="card-info">
                <h3 className="card-title">Account</h3>
                <p className="card-description">
                  Manage your personal information
                </p>
              </div>
              <div className="card-arrow">
                <ArrowIcon />
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div
            className="profile-card"
            onClick={() => navigate("/profile/orders")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate("/profile/orders");
              }
            }}
          >
            <div className="card-content">
              <div className="card-icon">
                <OrdersIcon />
              </div>
              <div className="card-info">
                <h3 className="card-title">Orders</h3>
                <p className="card-description">View your order history</p>
              </div>
              <div className="card-arrow">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;