// src/Components/Dashboards/AdminDashboard/AdminDashboard.js
import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminProfile from "../../UserManagement/Profiles/AdminProfile/AdminProfile";
import Finance from "../../FinanceManagement/Finance"; // Show subscription plans
import SubscriptionForm from "../../FinanceManagement/SubscriptionForm"; // Create subscription
import AdminUserList from "../../UserManagement/AdminDashboard/AdminUserList"; // Manage Users
import Store from "../../Store/Store";
import AdminOrders from "../../Store/AdminOrders";
import PaymentsTable from "../../FinanceManagement/PaymentsTable"; // ✅ Payments table

// Placeholder Components
function ManageSubscriptions() {
  return <Finance />; // Show subscription plans
}

function CreateSubscriptions() {
  return <SubscriptionForm />; // Form for creating a new subscription
}

function ManageBookings() {
  return (
    <div>
      <h2>Manage Bookings</h2>
      <p>Handle and review all user bookings.</p>
    </div>
  );
}

function ManageStore() {
  return <Store />;
}

function Payments() {
  return <PaymentsTable />; // ✅ Display payments table here
}

// Main Dashboard
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AdminProfile />;
      case "users":
        return <AdminUserList />; // Manage Users
      case "subscriptions":
        return <ManageSubscriptions />;
      case "createsubscriptions":
        return <CreateSubscriptions />;
      case "bookings":
        return <ManageBookings />;
      case "store":
        return <ManageStore />;
      case "orders":
        return <AdminOrders />;
      case "payments":
        return <Payments />; // Payments tab
      default:
        return <AdminProfile />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Manage Users
          </li>
          <li
            className={activeTab === "subscriptions" ? "active" : ""}
            onClick={() => setActiveTab("subscriptions")}
          >
            Manage Subscriptions
          </li>
          <li
            className={activeTab === "createsubscriptions" ? "active" : ""}
            onClick={() => setActiveTab("createsubscriptions")}
          >
            Create Subscription
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Manage Bookings
          </li>
          <li
            className={activeTab === "store" ? "active" : ""}
            onClick={() => setActiveTab("store")}
          >
            Manage Store
          </li>
          <li
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          <li
            className={activeTab === "payments" ? "active" : ""}
            onClick={() => setActiveTab("payments")}
          >
            Payments
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;
