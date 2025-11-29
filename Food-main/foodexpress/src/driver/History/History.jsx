import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Phone,
  DollarSign,
  Package,
  TrendingUp,
  Star,
} from "lucide-react";
import "./History.css";

const History = () => {
  const [completedDeliveries, setCompletedDeliveries] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [timeFilter, setTimeFilter] = useState("all"); // all, today, week, month
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    totalEarnings: 0,
    avgRating: 4.8,
    todayDeliveries: 0,
  });

  // Mock current driver data - Replace with actual auth context
  const currentDriver = {
    id: "D001",
    name: "John Doe",
  };

  useEffect(() => {
    loadCompletedDeliveries();
  }, []);

  const loadCompletedDeliveries = () => {
    try {
      const deliveries = JSON.parse(localStorage.getItem("deliveries") || "[]");
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");

      // Filter completed deliveries for current driver
      const driverCompletedDeliveries = deliveries.filter(
        (delivery) =>
          delivery.driverId === currentDriver.id &&
          delivery.status === "Completed"
      );

      // Merge with order details
      const completedData = driverCompletedDeliveries
        .map((delivery) => {
          const order = orders.find((o) => o.id === delivery.orderId);
          return {
            ...delivery,
            orderDetails: order || {},
            completedAt: delivery.completedAt || delivery.updatedAt,
          };
        })
        .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)); // Sort by most recent

      setCompletedDeliveries(completedData);
      calculateStats(completedData);
    } catch (error) {
      console.error("Error loading completed deliveries:", error);
    }
  };

  const calculateStats = (deliveries) => {
    const total = deliveries.length;
    const totalEarnings = deliveries.reduce((sum, delivery) => {
      return sum + (delivery.orderDetails.total || 0) * 0.15; // 15% commission
    }, 0);

    const today = new Date().toDateString();
    const todayCount = deliveries.filter(
      (d) => new Date(d.completedAt).toDateString() === today
    ).length;

    setStats({
      totalDeliveries: total,
      totalEarnings: totalEarnings,
      avgRating: 4.8, // Mock rating
      todayDeliveries: todayCount,
    });
  };

  const getFilteredDeliveries = () => {
    const now = new Date();

    switch (timeFilter) {
      case "today":
        return completedDeliveries.filter(
          (d) => new Date(d.completedAt).toDateString() === now.toDateString()
        );
      case "week":
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return completedDeliveries.filter(
          (d) => new Date(d.completedAt) >= weekAgo
        );
      case "month":
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return completedDeliveries.filter(
          (d) => new Date(d.completedAt) >= monthAgo
        );
      default:
        return completedDeliveries;
    }
  };

  const filteredDeliveries = getFilteredDeliveries();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateEarnings = (orderTotal) => {
    return (orderTotal * 0.15).toFixed(2); // 15% commission
  };

  return (
    <div className="history-container">
      {/* Header */}
      <div className="history-header">
        <div className="header-content">
          <div className="header-title">
            <CheckCircle size={32} />
            <div>
              <h1>Delivery History</h1>
              <p>Track your completed deliveries and earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-card-large">
            <div
              className="stat-icon"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <Package size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.totalDeliveries}</span>
              <span className="stat-label">Total Deliveries</span>
            </div>
          </div>

          <div className="stat-card-large">
            <div
              className="stat-icon"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              }}
            >
              <DollarSign size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">
                ${stats.totalEarnings.toFixed(2)}
              </span>
              <span className="stat-label">Total Earnings</span>
            </div>
          </div>

          <div className="stat-card-large">
            <div
              className="stat-icon"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              }}
            >
              <Star size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.avgRating.toFixed(1)}</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>

          <div className="stat-card-large">
            <div
              className="stat-icon"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              }}
            >
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.todayDeliveries}</span>
              <span className="stat-label">Today's Deliveries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Time Filter */}
      <div className="filter-section">
        <div className="filter-container">
          <button
            className={`time-filter ${timeFilter === "all" ? "active" : ""}`}
            onClick={() => setTimeFilter("all")}
          >
            All Time ({completedDeliveries.length})
          </button>
          <button
            className={`time-filter ${timeFilter === "today" ? "active" : ""}`}
            onClick={() => setTimeFilter("today")}
          >
            Today
          </button>
          <button
            className={`time-filter ${timeFilter === "week" ? "active" : ""}`}
            onClick={() => setTimeFilter("week")}
          >
            This Week
          </button>
          <button
            className={`time-filter ${timeFilter === "month" ? "active" : ""}`}
            onClick={() => setTimeFilter("month")}
          >
            This Month
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="history-content">
        {filteredDeliveries.length === 0 ? (
          <div className="empty-history">
            <CheckCircle size={64} />
            <h3>No Delivery History</h3>
            <p>Your completed deliveries will appear here.</p>
          </div>
        ) : (
          <div className="history-list">
            {filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="history-item">
                <div className="history-item-header">
                  <div className="history-item-badge">
                    <CheckCircle size={20} />
                    <span>Completed</span>
                  </div>
                  <div className="history-item-date">
                    <Calendar size={16} />
                    <span>{formatDate(delivery.completedAt)}</span>
                  </div>
                </div>

                <div className="history-item-body">
                  <div className="history-main-info">
                    <div className="order-id-section">
                      <h3>Order #{delivery.orderId}</h3>
                      <div className="customer-info-compact">
                        <span className="customer-name">
                          {delivery.customerName}
                        </span>
                        <div className="customer-contact">
                          <Phone size={14} />
                          <span>{delivery.customerPhone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="earnings-section">
                      <span className="earnings-label">Your Earnings</span>
                      <span className="earnings-amount">
                        ${calculateEarnings(delivery.orderDetails.total || 0)}
                      </span>
                    </div>
                  </div>

                  <div className="history-details-grid">
                    <div className="history-detail-item">
                      <MapPin size={16} />
                      <div className="detail-text">
                        <span className="detail-label">Delivery Address</span>
                        <span className="detail-value">
                          {delivery.deliveryAddress}
                        </span>
                      </div>
                    </div>

                    <div className="history-detail-item">
                      <Package size={16} />
                      <div className="detail-text">
                        <span className="detail-label">Order Total</span>
                        <span className="detail-value">
                          ${delivery.orderDetails.total?.toFixed(2) || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {delivery.orderDetails.items &&
                    delivery.orderDetails.items.length > 0 && (
                      <div className="history-items-preview">
                        <span className="items-label">Items:</span>
                        <div className="items-tags">
                          {delivery.orderDetails.items
                            .slice(0, 3)
                            .map((item, index) => (
                              <span key={index} className="item-tag">
                                {item.name} x{item.quantity}
                              </span>
                            ))}
                          {delivery.orderDetails.items.length > 3 && (
                            <span className="item-tag more">
                              +{delivery.orderDetails.items.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                <div className="history-item-footer">
                  <button
                    className="btn-view-details"
                    onClick={() => setSelectedDelivery(delivery)}
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedDelivery && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedDelivery(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-content">
                <CheckCircle size={24} />
                <div>
                  <h2>Delivery Details</h2>
                  <p>Order #{selectedDelivery.orderId}</p>
                </div>
              </div>
              <button
                className="modal-close"
                onClick={() => setSelectedDelivery(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Delivery Information</h3>
                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <span className="modal-label">Status</span>
                    <span className="modal-value completed">
                      <CheckCircle size={16} />
                      Completed
                    </span>
                  </div>
                  <div className="modal-info-item">
                    <span className="modal-label">Completed At</span>
                    <span className="modal-value">
                      {formatDate(selectedDelivery.completedAt)}
                    </span>
                  </div>
                  <div className="modal-info-item">
                    <span className="modal-label">Customer</span>
                    <span className="modal-value">
                      {selectedDelivery.customerName}
                    </span>
                  </div>
                  <div className="modal-info-item">
                    <span className="modal-label">Phone</span>
                    <span className="modal-value">
                      {selectedDelivery.customerPhone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Delivery Address</h3>
                <div className="modal-address">
                  <MapPin size={20} />
                  <p>{selectedDelivery.deliveryAddress}</p>
                </div>
              </div>

              {selectedDelivery.orderDetails &&
                selectedDelivery.orderDetails.items && (
                  <div className="modal-section">
                    <h3>Order Items</h3>
                    <div className="modal-items">
                      {selectedDelivery.orderDetails.items.map(
                        (item, index) => (
                          <div key={index} className="modal-item">
                            <div className="modal-item-info">
                              <span className="modal-item-name">
                                {item.name}
                              </span>
                              <span className="modal-item-qty">
                                Quantity: {item.quantity}
                              </span>
                            </div>
                            <span className="modal-item-price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div className="modal-section">
                <h3>Earnings Summary</h3>
                <div className="earnings-breakdown">
                  <div className="earnings-row">
                    <span>Order Total:</span>
                    <span>
                      $
                      {selectedDelivery.orderDetails.total?.toFixed(2) ||
                        "0.00"}
                    </span>
                  </div>
                  <div className="earnings-row">
                    <span>Commission (15%):</span>
                    <span className="earnings-highlight">
                      $
                      {calculateEarnings(
                        selectedDelivery.orderDetails.total || 0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
