// src/App.js

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
//import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
//import ShowItems from "./Components/Store/ShowItems";
import { CartProvider } from "./Components/Store/CartContext";
//import Layout from "./components/Layout"; // make sure this path is correct


// Components
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import About from "./Components/Features/Features";
import Features from "./Components/Features/Features";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

// Dashboards
import UserDashboard from "./Components/Dashboards/UserDashboard/UserDashboard";
import InstructorDashboard from "./Components/Dashboards/InstructorDashboard/InstructorDashboard";
import GymDashboard from "./Components/Dashboards/GymDashboard/GymDashboard";
import AdminDashboard from "./Components/Dashboards/AdminDashboard/AdminDashboard";

// // Profiles
// import UserProfile from "./Components/UserManagement/Profiles/UserProfile/UserProfile";
// import InstructorProfile from "./Components/UserManagement/Profiles/InstructorProfile/InstructorProfile";
// import GymProfile from "./Components/UserManagement/Profiles/GymProfile/GymProfile";
// import AdminProfile from "./Components/UserManagement/Profiles/AdminProfile/AdminProfile";

// Schedule Management
import SchedulePage from "./Components/ScheduleManagement/SchedulePage/SchedulePage";
import Schedule from "./Components/ScheduleManagement/ScheduleFitness/Schedule";
import FitnessSchedule from "./Components/ScheduleManagement/ScheduleFitness/FitnessSchedule";
import TimeSchedule from "./Components/ScheduleManagement/TimeSchedule/TimeSchedule";
import UploadScheduleForm from "./Components/ScheduleManagement/UploadScheduleForm/UploadScheduleForm";
import ScheduleRequestForm from "./Components/ScheduleManagement/ScheduleRequest/ScheduleRequestForm";
import InstructorSchedulePage from "./Components/ScheduleManagement/SchedulePage/InstructorSchedulePage";
import ChangeRequestForm from "./Components/ScheduleManagement/ChangeRequest/ChangeRequestForm";
import UserSchedule from "./Components/ScheduleManagement/UserSchedule/UserSchedule";



// Finance
import Finance from "./Components/FinanceManagement/Finance";
import SubscriptionForm from "./Components/FinanceManagement/SubscriptionForm";
import UpdateFinance from "./Components/FinanceManagement/UpdateFinance";
import UserSubscriptionPlan from "./Components/FinanceManagement/UserSubscriptionPlan";


//Store
import Store from "./Components/Store/Store";
import ShowItems from "./Components/Store/ShowItems";
import ProductDetails from "./Components/Store/ProductDetails";
import Cart from "./Components/Store/Cart";
//import ShowItems from "./Components/Store/ShowItems";
//import Cart from "./Components/Store/Cart";
import AddStoreItem from "./Components/Store/AddStoreItem";
import UpdateItem from "./Components/Store/UpdateItem";

function Layout() {
  const location = useLocation();

  // Hide nav on login, register, and all dashboard pages
  const hideNavRoutes = [
    "/login",
    "/register",
    "/user-dashboard",
    "/instructor-dashboard",
    "/gym-dashboard",
    "/admin-dashboard",
  ];
  const hideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!hideNav && <Nav />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/gym-dashboard" element={<GymDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Profiles
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile2" element={<InstructorProfile />} />
        <Route path="/profile3" element={<GymProfile />} />
        <Route path="/profile4" element={<AdminProfile />} /> */}

        {/* Schedule Management */}
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/timeschedule" element={<TimeSchedule />} />
        <Route path="/FitnessSchedule" element={<FitnessSchedule />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/upload-schedule" element={<UploadScheduleForm />} />
        <Route path="/request-schedule" element={<ScheduleRequestForm />} />
        <Route path="/instructor-schedules" element={<InstructorSchedulePage />} />
        <Route path="/change-request" element={<ChangeRequestForm />} />
        <Route path="/user-schedules" element={<UserSchedule />} />
        

        



        {/* Finance Management */}
        <Route path="/finance" element={<Finance />} />
        <Route path="/subscription-form" element={<SubscriptionForm />} /> {/* ✅ fixed route */}
        <Route path="/subscribe" element={<SubscriptionForm />} /> {/* ✅ alternative route */}
        <Route path="/finance/update/:id" element={<UpdateFinance />} />
        <Route path="/subscriptions" element={<UserSubscriptionPlan />} />


        {/* Store*/}
        <Route path="/store" element={<Store />} />
        <Route path="/showItems" element={<ShowItems />} />
        <Route path="/category/:catname" element={<ShowItems />} />
        <Route path="/product/:id" element ={<ProductDetails />} />
        <Route path="cart" element={<Cart />}/>
        <Route path="/AddStoreItem" element={<AddStoreItem />} />
        <Route path="/store/:id" element={<UpdateItem />} />

      </Routes>
    </>
  );
}

function App() {

  return(
    <CartProvider>
    <Layout />
    </CartProvider>);
}

export default App;
