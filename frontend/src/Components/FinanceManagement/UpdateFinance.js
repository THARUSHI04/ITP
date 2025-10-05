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
    currency: "USD",
    discount_percentage: 0,
    final_price: 0,
    access_level: "Gym only",
    features_included: "",
    status: "active",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch current plan details
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/finance/${id}`);
        const fetched = response.data;
        setPlan({
          ...fetched,
          features_included: (fetched.features_included || []).join(", "),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load plan details");
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  // Calculate final price on price/discount change
  useEffect(() => {
    const price = Number(plan.price) || 0;
    const discount = Number(plan.discount_percentage) || 0;
    const final = discount > 0 ? price - (price * discount) / 100 : price;
    setPlan((prev) => ({ ...prev, final_price: final }));
  }, [plan.price, plan.discount_percentage]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...plan,
        price: Number(plan.price),
        durationMonths: Number(plan.durationMonths),
        discount_percentage: Number(plan.discount_percentage),
        features_included: plan.features_included
          ? plan.features_included.split(",").map((f) => f.trim())
          : [],
      };

      await axios.put(`http://localhost:5000/finance/${id}`, payload);
      setMessage("✅ Plan updated successfully!");
      setTimeout(() => navigate("/finance"), 1500);
    } catch (err) {
      console.error(err);
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
          <input type="text" name="planName" value={plan.planName} onChange={handleChange} placeholder="Plan Name" required />
          <input type="number" name="price" value={plan.price} onChange={handleChange} placeholder="Price" required />
          <input type="number" name="durationMonths" value={plan.durationMonths} onChange={handleChange} placeholder="Duration (months)" required />

          <select name="currency" value={plan.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="LKR">LKR</option>
            <option value="EUR">EUR</option>
          </select>

          <input type="number" name="discount_percentage" value={plan.discount_percentage} onChange={handleChange} placeholder="Discount (%)" />
          <input type="number" name="final_price" value={plan.final_price} readOnly placeholder="Final Price" />

          <select name="access_level" value={plan.access_level} onChange={handleChange}>
            <option value="Gym only">Gym only</option>
            <option value="Gym + Online Coaching">Gym + Online Coaching</option>
            <option value="Online Coaching only">Online Coaching only</option>
          </select>

          <input type="text" name="features_included" value={plan.features_included} onChange={handleChange} placeholder="Features (comma-separated)" />

          <select name="status" value={plan.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <textarea name="description" value={plan.description} onChange={handleChange} placeholder="Description" rows="4" />

          <button type="submit">Update Plan</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFinance;
