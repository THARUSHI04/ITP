// src/Component/FinanceManagment/UserSubscriptionPlan.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserSubscriptionPlan.css";

function UserSubscriptionPlan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:60299/api/UserSubscriptionPlan");
        const fetchedPlans = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setPlans(fetchedPlans);
        setLoading(false);
      } catch (err) {
        setError("❌ Failed to load plans");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) return <p>Loading subscription plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="finance-container">
      <h1 className="title">Core Plus Subscription Plans</h1>
      <div className="plans">
        {plans.map((plan) => (
          <div
            key={plan._id || plan.planName}
            className={`plan-card ${plan.highlight ? "highlight" : ""}`}
          >
            <h2>{plan.planName}</h2>
            <div className="price">${plan.price}</div>
            <p className="per">
              per user / per {plan.durationMonths} month
              {plan.durationMonths > 1 ? "s" : ""}
            </p>
            <ul>
              {plan.description
                ? plan.description.split("\n").map((item, index) => (
                    <li key={index}>✔ {item}</li>
                  ))
                : null}
            </ul>
            <button className="btn" onClick={() => navigate("/subscribe")}>
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSubscriptionPlan;
