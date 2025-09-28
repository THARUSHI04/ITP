import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./SubscriptionForm.css";

function SubscriptionForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if editing an existing plan
  const editingPlan = location.state?.plan;

  const [formData, setFormData] = useState({
    planName: "",
    durationMonths: "",
    price: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  // Pre-fill form if editing
  useEffect(() => {
    if (editingPlan) {
      setFormData({
        planName: editingPlan.planName || "",
        durationMonths: editingPlan.durationMonths || "",
        price: editingPlan.price || "",
        description: editingPlan.description || "",
      });
    }
  }, [editingPlan]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPlan?._id) {
        // Update existing plan
        await axios.put(`http://localhost:5000/finance/${editingPlan._id}`, {
          ...formData,
          price: Number(formData.price),
          durationMonths: Number(formData.durationMonths),
        });

        setMessage("✅ Subscription Plan Updated Successfully!");
      } else {
        // Add new plan
        await axios.post("http://localhost:5000/finance", {
          ...formData,
          price: Number(formData.price),
          durationMonths: Number(formData.durationMonths),
        });

        setMessage("✅ Subscription Plan Added Successfully!");
        setFormData({
          planName: "",
          durationMonths: "",
          price: "",
          description: "",
        });
      }

      // Redirect to Finance page after short delay
      setTimeout(() => navigate("/finance"), 1000);
    } catch (error) {
      setMessage("❌ Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="finance-container">
      <h1 className="title">
        {editingPlan ? "Update Subscription Plan" : "Create Subscription Plan"}
      </h1>

      <form className="form-card" onSubmit={handleSubmit}>
        {/* Plan Name */}
        <div className="form-group">
          <label htmlFor="planName">Plan Name</label>
          <input
            type="text"
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            placeholder="Enter plan name"
            required
          />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label htmlFor="durationMonths">Duration (Months)</label>
          <input
            type="number"
            id="durationMonths"
            name="durationMonths"
            value={formData.durationMonths}
            onChange={handleChange}
            placeholder="Enter duration"
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            maxLength="200"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn">
          {editingPlan ? "Update Plan" : "Submit Plan"}
        </button>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}
      </form>
    </div>
  );
}

export default SubscriptionForm;
