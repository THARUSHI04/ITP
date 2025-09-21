import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/features" className={({ isActive }) => (isActive ? "active" : "")}>
            Features
          </NavLink>
        </li>
        <li>
          <NavLink to="/store" className={({ isActive }) => (isActive ? "active" : "")}>
            Store
          </NavLink>
        </li>
        <li>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
            Login / Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
