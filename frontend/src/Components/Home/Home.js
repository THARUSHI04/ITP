import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <main className="hero">
        <h1>Welcome to <span className="highlight">CorePlus</span></h1>
        <p>Your fitness journey starts here. Explore trainers, classes, and products.</p>
        <div className="hero-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
