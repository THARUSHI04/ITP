// src/Components/Dashboards/InstructorDashboard/InstructorDashboard.js
import React, { useState } from "react";
import "./InstructorDashboard.css";

// Import components
import InstructorProfile from "../../UserManagement/Profiles/InstructorProfile/InstructorProfile";
import FitnessSchedule from "../../ScheduleManagement/ScheduleFitness/FitnessSchedule";
import InstructorSchedulePage from "../../ScheduleManagement/SchedulePage/InstructorSchedulePage";

// Placeholder components
function BookedClients() {
  return (
    <div>
      <h2>Booked Clients</h2>
      <p>View clients who have booked sessions with you.</p>
    </div>
  );
}

function Earnings() {
  return (
    <div>
      <h2>Earnings</h2>
      <p>Track your income from training sessions.</p>
    </div>
  );
}

// Main Dashboard
function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <InstructorProfile />;
      case "classes":
        return <InstructorSchedulePage />;
      case "schedule":
        return <FitnessSchedule />;
      case "clients":
        return <BookedClients />;
      case "earnings":
        return <Earnings />;
      case "requests":
        return <FitnessSchedule />;
      default:
        return <InstructorProfile />;
    }
  };

  return (
    <div className="instructor-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>

          <li
            className={activeTab === "classes" ? "active" : ""}
            onClick={() => setActiveTab("classes")}
          >
            My Classes
          </li>

          <li
            className={activeTab === "schedule" ? "active" : ""}
            onClick={() => setActiveTab("schedule")}
          >
            Schedule
          </li>

          <li
            className={activeTab === "clients" ? "active" : ""}
            onClick={() => setActiveTab("clients")}
          >
            Booked Clients
          </li>

          <li
            className={activeTab === "earnings" ? "active" : ""}
            onClick={() => setActiveTab("earnings")}
          >
            Earnings
          </li>

          <li
            className={activeTab === "requests" ? "active" : ""}
            onClick={() => setActiveTab("requests")}
          >
            Schedule Requests
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
}

export default InstructorDashboard;
