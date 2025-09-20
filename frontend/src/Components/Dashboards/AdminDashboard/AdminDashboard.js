// src/Components/Dashboards/UserDashboard/UserDashboard.js
import React, { useState } from "react";
import "./AdminDashboard.css";
import AdminProfile from "../../UserManagement/Profiles/AdminProfile/AdminProfile";
// import ManageUsers from "";
// import ManageTrainers from "";
// import ManageGyms from "";
// import ManageSubscriptions from "";
// import ManageBookings from "";
// import Payments from "";


// Main Dashboard
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("profile4");

  const renderContent = () => {
    switch (activeTab) {
      case "profile4":
        return <AdminProfile />;
      // case "subscribed":
      //   return <SubscribedPlans />;
      // case "sessions":
      //   return <TrainingSessions />;  
      // case "bookings":
      //   return <Bookings />;
      // case "purchases":
      //   return <MyPurchases />;
      default:
        return <AdminProfile />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <ul>
          <li
            className={activeTab === "profile4" ? "active" : ""}
            onClick={() => setActiveTab("profile4")}
          >
            Profile
          </li>
          <li
            // className={activeTab === "subscribed" ? "active" : ""}
            // onClick={() => setActiveTab("subscribed")}
          >
            Manage Users
          </li>
          <li
            // className={activeTab === "sessions" ? "active" : ""}
            // onClick={() => setActiveTab("sessions")}
          >
           Manage Trainers
          </li>          
          <li
            className={activeTab === "bookings" ? "active" : ""}
            onClick={() => setActiveTab("bookings")}
          >
           Manage Gyms
          </li>
          <li
            // className={activeTab === "purchases" ? "active" : ""}
            // onClick={() => setActiveTab("purchases")}
          >
            Manage Subscriptions
          </li>
          <li
            // className={activeTab === "purchases" ? "active" : ""}
            // onClick={() => setActiveTab("purchases")}
          >
            Manage Bookings
          </li>
           <li
            // className={activeTab === "purchases" ? "active" : ""}
            // onClick={() => setActiveTab("purchases")}
          >
            Payments
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminDashboard;
