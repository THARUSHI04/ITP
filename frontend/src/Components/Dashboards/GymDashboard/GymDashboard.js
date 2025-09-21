// src/Components/Dashboards/GymDashboard/GymDashboard.js
import React, { useState } from "react";
import "./GymDashboard.css";
import GymProfile from "../../UserManagement/Profiles/GymProfile/GymProfile";

// Placeholder Components
function Appointments() {
  return (
    <div>
      <h2>Appointments</h2>
      <p>View and manage client bookings here.</p>
    </div>
  );
}

// Main Dashboard
function GymDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <GymProfile />;
      case "appointments":
        return <Appointments />;
      default:
        return <GymProfile />;
    }
  };

  return (
    <div className="gym-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={activeTab === "appointments" ? "active" : ""}
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default GymDashboard;
