// src/Components/Dashboards/UserDashboard/UserDashboard.js
import React, { useState } from "react";
import "./UserDashboard.css";

// Dashboard sections (simple placeholders)
function Profile() {
  return <div><h2>Profile</h2><p>Update your personal information here.</p></div>;
}

function SubscribedClasses() {
  return <div><h2>Subscribed Classes</h2><p>View your active subscriptions.</p></div>;
}

function Bookings() {
  return <div><h2>Bookings</h2><p>Check your booked sessions.</p></div>;
}

function MyPurchases() {
  return <div><h2>My Purchases</h2><p>Track your purchased products.</p></div>;
}

// Main Dashboard
function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "subscribed":
        return <SubscribedClasses />;
      case "bookings":
        return <Bookings />;
      case "purchases":
        return <MyPurchases />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="user-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={activeTab === "subscribed" ? "active" : ""}
            onClick={() => setActiveTab("subscribed")}
          >
            Subscribed Classes
          </li>
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </li>
          <li
            className={activeTab === "purchases" ? "active" : ""}
            onClick={() => setActiveTab("purchases")}
          >
            My Purchases
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default UserDashboard;
