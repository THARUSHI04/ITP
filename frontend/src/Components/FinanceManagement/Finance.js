// src/Component/FinanceManagment/Finance.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Finance.css";

function Finance() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  

  // Fetch subscription plans from backend
  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:60299/api/finance");
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

  useEffect(() => {
    fetchPlans();
  }, []);

  // ✅ Delete plan function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:60299/api/finance/${id}`);
      // Remove deleted plan from state to update UI
      setPlans(plans.filter((plan) => plan._id !== id));
      alert("✅ Plan deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete plan");
    }
  };

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

            {/* ✅ Update and Delete Buttons */}
            <div className="button-group">
              <button
                className="btn-update"
                onClick={() => navigate(`/finance/update/${plan._id}`)}
              >
                Update
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(plan._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Finance;
