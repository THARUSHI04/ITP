// src/Components/Dashboards/UserDashboard/UserDashboard.js
import React, { useState } from "react";
import "./UserDashboard.css";

// Import components
import UserProfile from "../../UserManagement/Profiles/UserProfile/UserProfile";
import ScheduleRequestForm from "../../ScheduleManagement/ScheduleRequest/ScheduleRequestForm";
import UserSchedule from "../../ScheduleManagement/UserSchedule/UserSchedule";
import UserSubscriptionPlan from "../../FinanceManagement/UserSubscriptionPlan";

// Dashboard sections
function TrainingSessions() {
  return (
    <div>
      <h2>My Training Sessions</h2>
      <p>Track your purchased sessions.</p>
    </div>
  );
}

function Bookings() {
  return (
    <div>
      <h2>Bookings</h2>
      <p>Check your booked sessions.</p>
    </div>
  );
}

function MyPurchases() {
  return (
    <div>
      <h2>My Purchases</h2>
      <p>Track your purchased products.</p>
    </div>
  );
}

// Main Dashboard
function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "sessions":
        return <TrainingSessions />;
      case "subscribedClasses":
        return <UserSubscriptionPlan />; 
      case "bookings":
        return <Bookings />;
      case "purchases":
        return <MyPurchases />;
      case "schedules":
        return <UserSchedule />;
      default:
        return <UserProfile />;
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
            className={activeTab === "sessions" ? "active" : ""}
            onClick={() => setActiveTab("sessions")}
          >
            Training Sessions
          </li>
          <li
            className={activeTab === "subscribedClasses" ? "active" : ""}
            onClick={() => setActiveTab("subscribedClasses")}
          >
            Subscription Plans
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
          <li
            className={activeTab === "schedules" ? "active" : ""}
            onClick={() => setActiveTab("schedules")}
          >
            Schedule
          </li>
        </ul>
      </aside>

      <main className="dashboard-content">{renderContent()}</main>
    </div>
  );
}

export default UserDashboard;
