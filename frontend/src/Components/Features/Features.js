import React from "react";
import "./Features.css";

function Features() {
  return (
    <div className="features-page">

      {/* Hero Section */}
      <section className="features-hero">
        <h1>Platform <span className="highlight">Features</span></h1>
        <p>
          Discover everything CorePlus offers to help you achieve your fitness goals efficiently.
        </p>
      </section>

      {/* Features Grid */}
      <section className="features-grid">
        <div className="container">
          <div className="feature-card">
            <img 
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=400&q=80" 
              alt="Schedule Sessions"
            />
            <h3>Schedule Sessions Online</h3>
            <p>
              Book one-on-one or group sessions with certified trainers directly through the platform.
            </p>
          </div>
<div className="feature-card">
  <img 
    src="https://c8.alamy.com/comp/2K57P7H/fitness-trainer-sportive-woman-home-gym-online-2K57P7H.jpg
" 
    alt="Verified Trainers"
  />
  <h3>Verified Professional Trainers</h3>
  <p>
    All trainers are certified and experienced to ensure you get quality guidance.
  </p>
</div>

<div className="feature-card">
  <img 
    src="https://static.vecteezy.com/system/resources/previews/003/622/079/original/secure-and-safe-payment-vector.jpg" 
    alt="Secure Payments"
  />
  <h3>Secure Payments & Subscriptions</h3>
  <p>
    Pay safely online for your training packages and subscriptions with ease.
  </p>
</div>
          <div className="feature-card">
            <img 
              src="https://strong.lk/wp-content/uploads/2023/11/125.webp" 
              alt="Online Store"
            />
            <h3>Online Store</h3>
            <p>
              Purchase supplements, fitness gear, and wellness products directly from our platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-cta">
        <div className="container">
          <h2>Ready to Experience CorePlus?</h2>
          <p>Sign up today and explore all the tools and features designed to boost your fitness journey.</p>
          <a href="/register" className="btn-primary">Get Started</a>
        </div>
      </section>

    </div>
  );
}

export default Features;
