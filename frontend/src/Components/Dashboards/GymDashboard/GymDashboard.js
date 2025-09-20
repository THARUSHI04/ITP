// src/Components/Dashboards/UserDashboard/UserDashboard.js
import React, { useState } from "react";
import "./GymDashboard.css";
import GymProfile from "../../UserManagement/Profiles/GymProfile/GymProfile";
// import MyClasses from "";
// import Schedule from "";
// import BookedClients from "";
// import Earnings from "";


// Main Dashboard
function GymDashboard() {
  const [activeTab, setActiveTab] = useState("profile3");

  const renderContent = () => {
    switch (activeTab) {
      case "profile3":
        return <GymProfile />;
      // case "subscribed":
      //   return <SubscribedPlans />;
      default:
        return <GymProfile />;
    }
  };

  return (
    <div className="gym-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile3" ? "active" : ""}
            onClick={() => setActiveTab("profile3")}
          >
            Profile
          </li>
          <li
            // className={activeTab === "subscribed" ? "active" : ""}
            // onClick={() => setActiveTab("subscribed")}
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
