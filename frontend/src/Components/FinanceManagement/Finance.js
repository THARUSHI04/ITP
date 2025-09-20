import React from "react";
import Nav from "../Nav/Nav";
import "./Finance.css"; // import CSS file

function Finance() {
  return (
    <div className="finance-container">
      {/* Navigation */}
      <Nav />

      {/* Title */}
      <h1 className="title">Core Plus Subscription Plans</h1>

      {/* Plans Wrapper */}
      <div className="plans">
        {/* Starter */}
        <div className="plan-card">
          <h2>Starter</h2>
          <p className="price">$10</p>
          <p className="per">per user / per month</p>
          <ul>
            <li>✔ 3 gym visits per week</li>
            <li>✔ Access to basic equipment</li>
            <li>✔ Locker room access</li>
            <li>✔ Email support</li>
          </ul>
          <button className="btn">Get Started</button>
        </div>

        {/* Pro */}
        <div className="plan-card highlight">
          <h2>Pro</h2>
          <p className="price">$25</p>
          <p className="per">per user / per month</p>
          <ul>
            <li>✔ Unlimited gym access</li>
            <li>✔ 2 free personal training sessions</li>
            <li>✔ Access to group classes (Yoga, Zumba, HIIT)</li>
            <li>✔ Diet consultation (monthly)</li>
             <li>✔ Priority support</li>
            

          </ul>
          <button className="btn">Get Started</button>
        </div>

        {/* Elite */}
        <div className="plan-card">
          <h2>Elite</h2>
          <p className="price">$50</p>
          <p className="per">per user / per month</p>
          <ul>
            <li>✔ Unlimited access + VIP lounge</li>
            <li>✔ Dedicated personal trainer</li>
            <li>✔ Customized workout & diet plans</li>
            <li>✔ Free supplements starter kit</li>
            <li>✔ 24/7 priority support</li>
          </ul>
          <button className="btn">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Finance;
