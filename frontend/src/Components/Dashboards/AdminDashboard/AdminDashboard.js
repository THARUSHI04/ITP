// src/Components/Dashboards/AdminDashboard/AdminDashboard.js
import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminProfile from "../../UserManagement/Profiles/AdminProfile/AdminProfile";

// Placeholder Components
function ManageUsers() {
  return (
    <div>
      <h2>Manage Users</h2>
      <p>View, edit, and delete users in the system.</p>
    </div>
  );
}

function ManageTrainers() {
  return (
    <div>
      <h2>Manage Trainers</h2>
      <p>Manage trainer accounts and profiles.</p>
    </div>
  );
}

function ManageGyms() {
  return (
    <div>
      <h2>Manage Gyms</h2>
      <p>View and manage gym registrations.</p>
    </div>
  );
}

function ManageSubscriptions() {
  return (
    <div>
      <h2>Manage Subscriptions</h2>
      <p>Control subscription plans and pricing.</p>
    </div>
  );
}

function ManageBookings() {
  return (
    <div>
      <h2>Manage Bookings</h2>
      <p>Handle and review all user bookings.</p>
    </div>
  );
}

function Payments() {
  return (
    <div>
      <h2>Payments</h2>
      <p>View payment transactions and earnings.</p>
    </div>
  );
}

// Main Dashboard
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AdminProfile />;
      case "users":
        return <ManageUsers />;
      case "trainers":
        return <ManageTrainers />;
      case "gyms":
        return <ManageGyms />;
      case "subscriptions":
        return <ManageSubscriptions />;
      case "bookings":
        return <ManageBookings />;
      case "payments":
        return <Payments />;
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
            className={activeTab === "trainers" ? "active" : ""}
            onClick={() => setActiveTab("trainers")}
          >
            Manage Trainers
          </li>
          <li
            className={activeTab === "gyms" ? "active" : ""}
            onClick={() => setActiveTab("gyms")}
          >
            Manage Gyms
          </li>
          <li
            className={activeTab === "subscriptions" ? "active" : ""}
            onClick={() => setActiveTab("subscriptions")}
          >
            Manage Subscriptions
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Manage Bookings
          </li>
          <li
            className={activeTab === "schedules" ? "active" : ""}
            onClick={() => setActiveTab("schedules")}
          >
            Manage Schedules
          </li>
          <li
            className={activeTab === "store" ? "active" : ""}
            onClick={() => setActiveTab("store")}
          >
            Manage Store
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;
