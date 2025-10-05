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
    currency: "USD",
    discount_percentage: 0,
    final_price: 0,
    access_level: "Gym only",
    features_included: "",
    status: "active",
  });

  const [message, setMessage] = useState("");

  // Calculate final price whenever price or discount changes
  useEffect(() => {
    const price = Number(formData.price) || 0;
    const discount = Number(formData.discount_percentage) || 0;
    const final = discount > 0 ? price - (price * discount) / 100 : price;
    setFormData((prev) => ({ ...prev, final_price: final }));
  }, [formData.price, formData.discount_percentage]);

  // Pre-fill form if editing
  useEffect(() => {
    if (editingPlan) {
      setFormData({
        planName: editingPlan.planName || "",
        durationMonths: editingPlan.durationMonths || "",
        price: editingPlan.price || "",
        description: editingPlan.description || "",
        currency: editingPlan.currency || "USD",
        discount_percentage: editingPlan.discount_percentage || 0,
        final_price: editingPlan.final_price || editingPlan.price || 0,
        access_level: editingPlan.access_level || "Gym only",
        features_included: (editingPlan.features_included || []).join(", "),
        status: editingPlan.status || "active",
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

    // ✅ Frontend Validations
    if (formData.planName.trim().length < 3) {
      return setMessage("❌ Plan name must be at least 3 characters.");
    }
    if (!formData.price || Number(formData.price) < 0) {
      return setMessage("❌ Price must be a positive number.");
    }
    if (!formData.durationMonths || Number(formData.durationMonths) <= 0) {
      return setMessage("❌ Duration must be greater than 0.");
    }
    if (
      formData.discount_percentage &&
      (Number(formData.discount_percentage) < 0 ||
        Number(formData.discount_percentage) > 100)
    ) {
      return setMessage("❌ Discount must be between 0 and 100.");
    }
    if (formData.final_price < 0) {
      return setMessage("❌ Final price must be a positive number.");
    }
    if (!["active", "inactive"].includes(formData.status.toLowerCase())) {
      return setMessage("❌ Status must be 'active' or 'inactive'.");
    }
    if (
      formData.features_included &&
      !Array.isArray(formData.features_included.split(",").map(f => f.trim()))
    ) {
      return setMessage("❌ Features must be comma separated values.");
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      durationMonths: Number(formData.durationMonths),
      discount_percentage: Number(formData.discount_percentage),
      features_included: formData.features_included
        ? formData.features_included.split(",").map((f) => f.trim())
        : [],
    };

    try {
      if (editingPlan?._id) {
        // Update existing plan
        await axios.put(`http://localhost:5000/finance/${editingPlan._id}`, payload);
        setMessage("✅ Subscription Plan Updated Successfully!");
      } else {
        // Add new plan
        await axios.post("http://localhost:5000/finance", payload);
        setMessage("✅ Subscription Plan Added Successfully!");
        setFormData({
          planName: "",
          durationMonths: "",
          price: "",
          description: "",
          currency: "USD",
          discount_percentage: 0,
          final_price: 0,
          access_level: "Gym only",
          features_included: "",
          status: "active",
        });
      }

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
          <label htmlFor="price">Price</label>
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

        {/* Currency */}
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="USD">USD</option>
            <option value="LKR">LKR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Discount */}
        <div className="form-group">
          <label htmlFor="discount_percentage">Discount (%)</label>
          <input
            type="number"
            id="discount_percentage"
            name="discount_percentage"
            value={formData.discount_percentage}
            onChange={handleChange}
            placeholder="Enter discount percentage"
          />
        </div>

        {/* Final Price (readonly) */}
        <div className="form-group">
          <label htmlFor="final_price">Final Price</label>
          <input
            type="number"
            id="final_price"
            name="final_price"
            value={formData.final_price}
            readOnly
          />
        </div>

        {/* Access Level */}
        <div className="form-group">
          <label htmlFor="access_level">Access Level</label>
          <select
            id="access_level"
            name="access_level"
            value={formData.access_level}
            onChange={handleChange}
          >
            <option value="Gym only">Gym only</option>
            <option value="Gym + Online Coaching">Gym + Online Coaching</option>
            <option value="Online Coaching only">Online Coaching only</option>
          </select>
        </div>

        {/* Features Included */}
        <div className="form-group">
          <label htmlFor="features_included">Features Included</label>
          <input
            type="text"
            id="features_included"
            name="features_included"
            value={formData.features_included}
            onChange={handleChange}
            placeholder="e.g., PT sessions, Diet plan"
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
