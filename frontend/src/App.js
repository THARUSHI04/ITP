import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Components

import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Features from "./Components/Features/Features";
import Store from "./Components/Store/Store";
import Login from "./Components/Auth/Login";
import UserDashboard from "./Components/Dashboards/UserDashboard/UserDashboard";
import InstructorDashboard from "./Components/Dashboards/InstructorDashboard/InstructorDashboard";
import GymDashboard from "./Components/Dashboards/GymDashboard/GymDashboard";
import AdminDashboard from "./Components/Dashboards/AdminDashboard/AdminDashboard";
import UserProfile from "./Components/UserManagement/Profiles/UserProfile/UserProfile";
import InstructorProfile from "./Components/UserManagement/Profiles/InstructorProfile/InstructorProfile";
import GymProfile from "./Components/UserManagement/Profiles/GymProfile/GymProfile";
import AdminProfile from "./Components/UserManagement/Profiles/AdminProfile/AdminProfile";
import SchedulePage from "./Components/ScheduleManagement/SchedulePage/SchedulePage";
import TimeSchedule from "./Components/ScheduleManagement/TimeSchedule/TimeSchedule";

function Layout() {
  const location = useLocation();
  // Hide nav on login and user dashboard
  const hideNav = location.pathname === "/login" || location.pathname === "/user-dashboard";

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/gym-dashboard" element={<GymDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/profile2" element={<InstructorProfile />} /> 
        <Route path="/profile3" element={<GymProfile />} /> 
        <Route path="/profile4" element={<AdminProfile />} /> 
        <Route path="/TimeSchedule" element={<SchedulePage />} />
        <Route path="/TimeSchedule" element={<TimeSchedule />} />

      </Routes>


    </>
  );
}

function App() {
  return <Layout />;
}

export default App;
