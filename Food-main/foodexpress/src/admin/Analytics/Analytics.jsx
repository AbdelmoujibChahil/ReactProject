import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  FaBell,
  FaUserCircle,
  FaShoppingBag,
  FaMoneyBillWave,
  FaMotorcycle,
  FaUtensils,
  FaFileAlt,
  FaChartLine,
  FaTruck,
  FaClipboardList,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaFilter,
  FaDownload,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaClock,
  FaPercentage,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "../styles/AdminCommon.css";
import "./Analytics.css";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const location = useLocation();
  const [dateRange, setDateRange] = useState("7days");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Individual time filters for each chart
  const [revenueFilter, setRevenueFilter] = useState("week");
  const [ordersFilter, setOrdersFilter] = useState("today");
  const [categoryFilter, setCategoryFilter] = useState("week");
  const [paymentFilter, setPaymentFilter] = useState("month");
  const [statsFilter, setStatsFilter] = useState("week");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for analytics
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,890",
      change: "+15.3%",
      trend: "up",
      icon: <FaMoneyBillWave />,
      color: "#4CAF50",
    },
    {
      title: "Total Orders",
      value: "2,847",
      change: "+8.2%",
      trend: "up",
      icon: <FaShoppingBag />,
      color: "#FF7A00",
    },
    {
      title: "Avg Order Value",
      value: "$16.12",
      change: "+3.4%",
      trend: "up",
      icon: <FaChartLine />,
      color: "#2196F3",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: <FaStar />,
      color: "#FFC107",
    },
  ];

  const revenueData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue",
        data: [4200, 5800, 4900, 6300, 7200, 8500, 6800],
        borderColor: "#FF7A00",
        backgroundColor: "rgba(255, 122, 0, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
      {
        label: "Previous Week",
        data: [3800, 5200, 4500, 5800, 6500, 7800, 6200],
        borderColor: "#E0E0E0",
        backgroundColor: "rgba(224, 224, 224, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        borderDash: [5, 5],
      },
    ],
  };

  const ordersData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
    datasets: [
      {
        label: "Orders",
        data: [45, 32, 78, 165, 142, 198, 87],
        backgroundColor: "rgba(255, 122, 0, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const categoryData = {
    labels: ["Pizza", "Burgers", "Chicken", "Tacos", "Sandwich"],
    datasets: [
      {
        data: [320, 280, 210, 180, 150],
        backgroundColor: [
          "#FF7A00",
          "#FF9500",
          "#FFB74D",
          "#FFC107",
          "#FFD54F",
        ],
        borderWidth: 0,
      },
    ],
  };

  const paymentMethodData = {
    labels: ["Credit Card", "Cash", "Digital Wallet", "Debit Card"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#4CAF50", "#FF7A00", "#2196F3", "#FFC107"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "Inter",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          family: "Inter",
        },
        bodyFont: {
          size: 13,
          family: "Inter",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
            family: "Inter",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "Inter",
          },
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.2,
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 13,
            family: "Inter",
            weight: "500",
          },
          boxWidth: 15,
          boxHeight: 15,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: false,
                  index: i,
                  pointStyle: "circle",
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.parsed;
            return label;
          },
        },
      },
    },
  };

  const topProducts = [
    { name: "Margherita Pizza", orders: 342, revenue: "$4,788", trend: "+12%" },
    { name: "Classic Burger", orders: 298, revenue: "$3,572", trend: "+8%" },
    { name: "Grilled Chicken", orders: 267, revenue: "$3,204", trend: "+15%" },
    { name: "Beef Tacos", orders: 234, revenue: "$2,808", trend: "+5%" },
    { name: "Club Sandwich", orders: 198, revenue: "$2,376", trend: "+3%" },
  ];

  const peakHours = [
    { time: "12:00 PM - 1:00 PM", orders: 234, percentage: "18%" },
    { time: "7:00 PM - 8:00 PM", orders: 198, percentage: "15%" },
    { time: "1:00 PM - 2:00 PM", orders: 167, percentage: "13%" },
    { time: "8:00 PM - 9:00 PM", orders: 145, percentage: "11%" },
  ];

  const customerMetrics = [
    { label: "New Customers", value: "342", change: "+23%", color: "#4CAF50" },
    {
      label: "Returning Customers",
      value: "1,847",
      change: "+12%",
      color: "#FF7A00",
    },
    {
      label: "Average Orders/Customer",
      value: "3.2",
      change: "+0.4",
      color: "#2196F3",
    },
    {
      label: "Customer Retention",
      value: "84%",
      change: "+5%",
      color: "#FFC107",
    },
  ];

  const handleDownloadReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Report downloaded successfully!");
    }, 1500);
  };

  return (
    <div className="analytics-container">
      {/* LEFT SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="sidebar-header">
          <div className="sidebar-header-content">
            {sidebarOpen && (
              <div className="logo-section">
                <div className="logo-icon">
                  <FaUtensils />
                </div>
                <div className="logo-text">
                  <h1>FoodExpress</h1>
                  <p>Admin Panel</p>
                </div>
              </div>
            )}
            {!sidebarOpen && (
              <div className="logo-icon-only">
                <FaUtensils />
              </div>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={`nav-item ${
              location.pathname === "/admin/dashboard" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaChartLine />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Dashboard</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/orders"
            className={`nav-item ${
              location.pathname === "/admin/orders" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaShoppingBag />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Orders</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/menu"
            className={`nav-item ${
              location.pathname === "/admin/menu" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaUtensils />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Menu</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/customers"
            className={`nav-item ${
              location.pathname === "/admin/customers" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaUsers />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Customers</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/deliveries"
            className={`nav-item ${
              location.pathname === "/admin/deliveries" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaTruck />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Deliveries</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/drivers"
            className={`nav-item ${
              location.pathname === "/admin/drivers" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaMotorcycle />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Drivers</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/reports"
            className={`nav-item ${
              location.pathname === "/admin/reports" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaFileAlt />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Reports</p>
              </div>
            )}
          </Link>
          <Link
            to="/admin/analytics"
            className={`nav-item ${
              location.pathname === "/admin/analytics" ? "active" : ""
            }`}
          >
            <span className="nav-icon">
              <FaChartLine />
            </span>
            {sidebarOpen && (
              <div className="nav-text">
                <p>Analytics</p>
              </div>
            )}
          </Link>
        </nav>

        {sidebarOpen && (
          <div className="sidebar-footer">
            <button className="logout-btn">
              <span>🚪</span> Logout
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOP HEADER */}
        <header className="top-header">
          <h1 className="header-title">FoodExpress</h1>
          <div className="header-user-section">
            <div className="header-user-info">
              <p className="header-user-name">Admin</p>
              <p className="header-user-role">Manager</p>
            </div>
            <div className="header-user-avatar">A</div>
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          {/* Filters and Actions */}
          <div className="analytics-actions">
            <div className="analytics-header-section">
              <div className="analytics-title-group">
                <h2 className="analytics-page-title">Analytics Dashboard</h2>
                <p className="analytics-page-subtitle">
                  Track your business performance
                </p>
              </div>
              <div className="global-time-filter">
                <button
                  className={`global-filter-btn ${
                    statsFilter === "today" ? "active" : ""
                  }`}
                  onClick={() => setStatsFilter("today")}
                >
                  <FaClock /> Today
                </button>
                <button
                  className={`global-filter-btn ${
                    statsFilter === "week" ? "active" : ""
                  }`}
                  onClick={() => setStatsFilter("week")}
                >
                  <FaCalendarAlt /> This Week
                </button>
                <button
                  className={`global-filter-btn ${
                    statsFilter === "month" ? "active" : ""
                  }`}
                  onClick={() => setStatsFilter("month")}
                >
                  <FaCalendarAlt /> This Month
                </button>
              </div>
            </div>
            <div className="analytics-actions-right">
              <button className="filter-btn">
                <FaFilter />
                <span>Advanced Filters</span>
              </button>
              <button
                className="download-btn"
                onClick={handleDownloadReport}
                disabled={isLoading}
              >
                <FaDownload />
                <span>{isLoading ? "Exporting..." : "Export Report"}</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ background: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-details">
                  <h3 className="stat-title">{stat.title}</h3>
                  <p className="stat-value">{stat.value}</p>
                  <div
                    className={`stat-change ${
                      stat.trend === "up" ? "positive" : "negative"
                    }`}
                  >
                    {stat.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts */}
          <div className="charts-row">
            <div className="chart-container large">
              <div className="chart-header">
                <div className="chart-header-left">
                  <h3 className="chart-title">
                    <FaChartLine />
                    Revenue Trends
                  </h3>
                  <span className="chart-subtitle">
                    Comparing current period with previous
                  </span>
                </div>
                <div className="chart-time-filter">
                  <button
                    className={`time-filter-btn ${
                      revenueFilter === "today" ? "active" : ""
                    }`}
                    onClick={() => setRevenueFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`time-filter-btn ${
                      revenueFilter === "week" ? "active" : ""
                    }`}
                    onClick={() => setRevenueFilter("week")}
                  >
                    Week
                  </button>
                  <button
                    className={`time-filter-btn ${
                      revenueFilter === "month" ? "active" : ""
                    }`}
                    onClick={() => setRevenueFilter("month")}
                  >
                    Month
                  </button>
                </div>
              </div>
              <div className="chart-body">
                <Line data={revenueData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-container medium">
              <div className="chart-header">
                <div className="chart-header-left">
                  <h3 className="chart-title">
                    <FaClock />
                    Orders by Hour
                  </h3>
                  <span className="chart-subtitle">Distribution by time</span>
                </div>
                <div className="chart-time-filter">
                  <button
                    className={`time-filter-btn ${
                      ordersFilter === "today" ? "active" : ""
                    }`}
                    onClick={() => setOrdersFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`time-filter-btn ${
                      ordersFilter === "week" ? "active" : ""
                    }`}
                    onClick={() => setOrdersFilter("week")}
                  >
                    Week
                  </button>
                  <button
                    className={`time-filter-btn ${
                      ordersFilter === "month" ? "active" : ""
                    }`}
                    onClick={() => setOrdersFilter("month")}
                  >
                    Month
                  </button>
                </div>
              </div>
              <div className="chart-body">
                <Bar data={ordersData} options={chartOptions} />
              </div>
            </div>
          </div>

          {/* Secondary Charts */}
          <div className="charts-row">
            <div className="chart-container circular">
              <div className="chart-header">
                <div className="chart-header-left">
                  <h3 className="chart-title">
                    <FaUtensils />
                    Top Categories
                  </h3>
                  <span className="chart-subtitle">By order volume</span>
                </div>
                <div className="chart-time-filter">
                  <button
                    className={`time-filter-btn ${
                      categoryFilter === "today" ? "active" : ""
                    }`}
                    onClick={() => setCategoryFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`time-filter-btn ${
                      categoryFilter === "week" ? "active" : ""
                    }`}
                    onClick={() => setCategoryFilter("week")}
                  >
                    Week
                  </button>
                  <button
                    className={`time-filter-btn ${
                      categoryFilter === "month" ? "active" : ""
                    }`}
                    onClick={() => setCategoryFilter("month")}
                  >
                    Month
                  </button>
                </div>
              </div>
              <div className="chart-body chart-body-circular">
                <Doughnut data={categoryData} options={pieChartOptions} />
              </div>
            </div>

            <div className="chart-container circular">
              <div className="chart-header">
                <div className="chart-header-left">
                  <h3 className="chart-title">
                    <FaMoneyBillWave />
                    Payment Methods
                  </h3>
                  <span className="chart-subtitle">Distribution</span>
                </div>
                <div className="chart-time-filter">
                  <button
                    className={`time-filter-btn ${
                      paymentFilter === "today" ? "active" : ""
                    }`}
                    onClick={() => setPaymentFilter("today")}
                  >
                    Today
                  </button>
                  <button
                    className={`time-filter-btn ${
                      paymentFilter === "week" ? "active" : ""
                    }`}
                    onClick={() => setPaymentFilter("week")}
                  >
                    Week
                  </button>
                  <button
                    className={`time-filter-btn ${
                      paymentFilter === "month" ? "active" : ""
                    }`}
                    onClick={() => setPaymentFilter("month")}
                  >
                    Month
                  </button>
                </div>
              </div>
              <div className="chart-body chart-body-circular">
                <Pie data={paymentMethodData} options={pieChartOptions} />
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="tables-row">
            <div className="analytics-table-container">
              <div className="table-header">
                <h3 className="table-title">
                  <FaStar />
                  Top Performing Products
                </h3>
              </div>
              <div className="analytics-table">
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Orders</th>
                      <th>Revenue</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td className="product-name">
                          <span className="rank">#{index + 1}</span>
                          {product.name}
                        </td>
                        <td>{product.orders}</td>
                        <td className="revenue">{product.revenue}</td>
                        <td>
                          <span className="trend-badge positive">
                            <FaArrowUp />
                            {product.trend}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="analytics-table-container">
              <div className="table-header">
                <h3 className="table-title">
                  <FaClock />
                  Peak Hours
                </h3>
              </div>
              <div className="analytics-table">
                <table>
                  <thead>
                    <tr>
                      <th>Time Slot</th>
                      <th>Orders</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peakHours.map((hour, index) => (
                      <tr key={index}>
                        <td>{hour.time}</td>
                        <td>{hour.orders}</td>
                        <td>
                          <div className="percentage-bar">
                            <div
                              className="percentage-fill"
                              style={{ width: hour.percentage }}
                            ></div>
                            <span>{hour.percentage}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Customer Metrics */}
          <div className="customer-metrics-section">
            <h3 className="section-title">
              <FaUsers />
              Customer Analytics
            </h3>
            <div className="customer-metrics-grid">
              {customerMetrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <h4 className="metric-label">{metric.label}</h4>
                  <p className="metric-value" style={{ color: metric.color }}>
                    {metric.value}
                  </p>
                  <div className="metric-change positive">
                    <FaArrowUp />
                    <span>{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;