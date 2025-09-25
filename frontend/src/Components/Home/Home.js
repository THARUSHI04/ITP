import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <main className="hero">
        <h1>
          Welcome to <span className="highlight">CorePlus</span>
        </h1>
        <p>Your fitness journey starts here. Explore trainers, classes, and products.</p>
        <div className="hero-buttons">
          {/* Navigate to Register */}
          <NavLink to="/register" className="btn-primary">
            Get Started
          </NavLink>

          {/* Navigate to Features */}
          <NavLink to="/features" className="btn-secondary">
            Learn More
          </NavLink>
        </div>
      </main>
    </div>
  );
}

export default Home;
