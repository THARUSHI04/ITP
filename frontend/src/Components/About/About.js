import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About <span className="highlight">CorePlus</span></h1>
        <p>
          Empowering Sri Lanka with world-class fitness guidance, training, and wellness solutions.
        </p>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container about-flex">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              CorePlus is a modern online platform that bridges the gap between 
              individuals and certified fitness professionals. Whether you're looking 
              for in-gym sessions or virtual coaching — we provide personalized 
              workout plans, nutrition guidance, and trainer support right at your fingertips.
            </p>
            <p>
              Our mission is to make fitness <strong>accessible, affordable, and convenient</strong> 
              for everyone in Sri Lanka. We believe that health is not a luxury — 
              it's a lifestyle that everyone deserves.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80" 
              alt="CorePlus Gym"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="about-mission">
        <div className="container mission-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>
              To deliver trusted fitness services through digital innovation 
              and connect people with verified fitness professionals.
            </p>
          </div>
          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>
              To become Sri Lanka’s most reliable fitness hub — inspiring 
              healthier and stronger communities nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Optional CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Join Our Community</h2>
          <p>Be a part of thousands who chose to redefine their lifestyle with CorePlus.</p>
          <a href="/register" className="btn-primary">Get Started</a>
        </div>
      </section>

    </div>
  );
}

export default About;
