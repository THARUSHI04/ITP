// src/Component/FinanceManagment/UpdateFinance.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateFinance.css";

function UpdateFinance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState({
    planName: "",
    price: "",
    durationMonths: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch the current plan details
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:60299/api/finance/${id}`);
        setPlan(response.data);
        setLoading(false);
      } catch (err) {
        setMessage("❌ Failed to load plan details");
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:60299/api/finance/${id}`, plan);
      setMessage("✅ Plan updated successfully!");
      setTimeout(() => navigate("/finance"), 1500); // redirect back
    } catch (err) {
      setMessage("❌ Failed to update plan");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="update-finance-container">
      <div className="update-finance-card">
        <h1>Update Subscription Plan</h1>

        {message && (
          <p
            className={`update-finance-message ${
              message.includes("✅") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="planName"
            value={plan.planName}
            onChange={handleChange}
            placeholder="Plan Name"
            required
          />
          <input
            type="number"
            name="price"
            value={plan.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="durationMonths"
            value={plan.durationMonths}
            onChange={handleChange}
            placeholder="Duration (months)"
            required
          />
          <textarea
            name="description"
            value={plan.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
          />
          <button type="submit">Update Plan</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFinance;
