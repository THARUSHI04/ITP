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
import SchedulePage from "./Components/SchedulePage/SchedulePage";
import TimeSchedule from "./Components/TimeSchedule/TimeSchedule";

function Layout() {
  const location = useLocation();
  // Hide nav on login and user dashboard
  const hideNav = location.pathname === "/login" || location.pathname === "/user-dashboard";

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
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
