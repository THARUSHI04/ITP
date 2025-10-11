import React, { useState , useEffect } from "react";
import "./AdminDashboard.css";
import AdminProfile from "../../UserManagement/Profiles/AdminProfile/AdminProfile";
import Finance from "../../FinanceManagement/Finance"; // Show subscription plans
import SubscriptionForm from "../../FinanceManagement/SubscriptionForm"; // Create subscription
import AdminUserList from "../../UserManagement/AdminDashboard/AdminUserList"; // <-- Import AdminUserList
import Store from "../../Store/Store";
import AdminOrders from "../../Store/AdminOrders";
import { useLocation } from "react-router-dom";
// Placeholder Components
// function ManageTrainers() {
//   return (
//     <div>
//       <h2>Manage Trainers</h2>
//       <p>Manage trainer accounts and profiles.</p>
//     </div>
//   );
// }

// function ManageGyms() {
//   return (
//     <div>
//       <h2>Manage Gyms</h2>
//       <p>View and manage gym registrations.</p>
//     </div>
//   );
// }

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
  return <Store />

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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if(location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  },[location.state]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AdminProfile />;
      case "users":
        return <AdminUserList />; // <-- Use full Manage Users page here
      // case "trainers":
      //   return <ManageTrainers />;
      // case "gyms":
      //   return <ManageGyms />;
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
          {/* <li
            className={activeTab === "trainers" ? "active" : ""}
            onClick={() => setActiveTab("trainers")}
          >
            Manage Trainers
          </li> */}
          {/* <li
            className={activeTab === "gyms" ? "active" : ""}
            onClick={() => setActiveTab("gyms")}
          >
            Manage Gyms
          </li> */}
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


           {/* ✅ Added Manage Store */}
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
