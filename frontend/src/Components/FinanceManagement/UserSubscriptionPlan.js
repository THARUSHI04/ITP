import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserSubscriptionPlan.css";

function UserSubscriptionPlan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // <-- search term

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/finance");
        setPlans(response.data); // directly set the array from backend
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

  // Filter plans based on search input
  const filteredPlans = plans.filter((plan) =>
    plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="finance-container">
      <h1 className="title">Core Plus Subscription Plans</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search plans..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="plans">
        {filteredPlans.map((plan) => (
          <div
            key={plan._id || plan.planName}
            className={`plan-card ${plan.highlight ? "highlight" : ""}`}
          >
            <h2>{plan.planName}</h2>
            {/* Display final price instead of original price */}
            <div className="price">
              {plan.currency || "USD"} {plan.final_price != null ? plan.final_price.toFixed(2) : "-"}
            </div>
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
            <button
              className="btn"
              onClick={() =>
                navigate("/checkout", { state: { plan } })
              }
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSubscriptionPlan;
