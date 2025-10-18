import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserPurchases.css";

function UserPurchases() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("Please log in to view your purchases");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:5000/orders/user/${userId}`);
      setOrders(response.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "Failed to load your purchases");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "#4caf50";
      case "shipped":
        return "#2196f3";
      case "completed":
        return "#8bc34a";
      case "cancelled":
        return "#f44336";
      case "pending":
      default:
        return "#ff9800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="user-purchases">
        <h2>My Purchases</h2>
        <p className="loading-text">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-purchases">
        <h2>My Purchases</h2>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="user-purchases">
        <h2>My Purchases</h2>
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <p>Start shopping in our store!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-purchases">
      <h2>My Purchases</h2>
      <p className="order-count">Total Orders: {orders.length}</p>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.order_number}</h3>
                <p className="order-date">{formatDate(order.createdAt)}</p>
              </div>
              <div
                className="order-status"
                style={{ backgroundColor: getStatusColor(order.status) }}
              >
                {order.status?.toUpperCase() || "PENDING"}
              </div>
            </div>

            <div className="order-items">
              {order.items?.map((item, index) => (
                <div key={index} className="order-item">
                  {item.product?.image && (
                    <img
                      src={`http://localhost:5000/${item.product.image}`}
                      alt={item.product?.name || "Product"}
                      className="item-image"
                    />
                  )}
                  <div className="item-details">
                    <h4>{item.product?.name || "Product"}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">
                      LKR {item.price} × {item.quantity} = LKR {item.subtotal}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-details">
                <p>
                  <strong>Payment Method:</strong> {order.payment_method || "N/A"}
                </p>
                <p>
                  <strong>Shipping Address:</strong> {order.shipping_address || "N/A"}
                </p>
                <p>
                  <strong>Contact:</strong> {order.contact_phone || "N/A"}
                </p>
              </div>
              <div className="order-total">
                <h3>Total: LKR {order.total_amount}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPurchases;
