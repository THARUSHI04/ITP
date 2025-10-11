import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Finance.css";

function Finance() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // <-- search term

  // Fetch subscription plans from backend
  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/finance");
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

  // Delete plan function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this plan?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/finance/${id}`);
      setPlans(plans.filter((plan) => plan._id !== id));
      alert("✅ Plan deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete plan");
    }
  };

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
            <div className="price">
              {plan.currency || "USD"} {plan.final_price || plan.price}
            </div>
            <p className="per">
              per user / per {plan.durationMonths} month
              {plan.durationMonths > 1 ? "s" : ""}
            </p>

            <ul>
              {/* Description */}
              {plan.description
                ? plan.description.split("\n").map((item, index) => (
                    <li key={index}>✔ {item}</li>
                  ))
                : null}

              {/* Features & Other Details */}
              {plan.features_included?.length > 0 && (
                <li>Features: {plan.features_included.join(", ")}</li>
              )}
              <li>Discount: {plan.discount_percentage || 0}%</li>
              <li>Final Price: {plan.final_price || plan.price}</li>
              <li>Access Level: {plan.access_level}</li>
              <li>Status: {plan.status}</li>
            </ul>

            {/* Update and Delete Buttons */}
            <div className="button-group">
              <button
                className="btn-update"
                onClick={() =>
                  navigate(`/finance/update/${plan._id}`, { state: { plan } })
                }
              >
                Update
              </button>
              <button className="btn-delete" onClick={() => handleDelete(plan._id)}>
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
