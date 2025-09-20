// src/Components/Dashboards/UserDashboard/UserDashboard.js
import React, { useState } from "react";
import "./InstructorDashboard.css";
import InstructorProfile from "../../UserManagement/Profiles/InstructorProfile/InstructorProfile";
// import MyClasses from "";
// import Schedule from "";
// import BookedClients from "";
// import Earnings from "";


// Main Dashboard
function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("profile2");

  const renderContent = () => {
    switch (activeTab) {
      case "profile2":
        return <InstructorProfile />;
      // case "subscribed":
      //   return <SubscribedPlans />;
      // case "sessions":
      //   return <TrainingSessions />;  
      // case "bookings":
      //   return <Bookings />;
      // case "purchases":
      //   return <MyPurchases />;
      default:
        return <InstructorProfile />;
    }
  };

  return (
    <div className="instructor-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile2" ? "active" : ""}
            onClick={() => setActiveTab("profile2")}
          >
            Profile
          </li>
          <li
            // className={activeTab === "subscribed" ? "active" : ""}
            // onClick={() => setActiveTab("subscribed")}
          >
            My Classes
          </li>
          <li
            // className={activeTab === "sessions" ? "active" : ""}
            // onClick={() => setActiveTab("sessions")}
          >
            Schedule
          </li>          
          <li
            // className={activeTab === "bookings" ? "active" : ""}
            // onClick={() => setActiveTab("bookings")}
          >
            Booked Clients
          </li>
          <li
            // className={activeTab === "purchases" ? "active" : ""}
            // onClick={() => setActiveTab("purchases")}
          >
            Earnings
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default InstructorDashboard;
