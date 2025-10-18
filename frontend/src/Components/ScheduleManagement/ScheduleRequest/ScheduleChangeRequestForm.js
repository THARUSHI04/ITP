import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ScheduleChangeRequestForm.css"; // Adjust path if CSS is in a different directory

function ScheduleChangeRequestForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { scheduleId, userId } = state || {};

  const [formData, setFormData] = useState({
    scheduleId: scheduleId || "",
    userId: userId || localStorage.getItem("userId") || "",
    userName: "",
    changeDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!formData.userId) {
      alert("User ID is missing. Please log in.");
      navigate("/login");
      return;
    }

    const fetchUserName = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${formData.userId}`);
        setFormData((prev) => ({ ...prev, userName: res.data.user.userName }));
      } catch (err) {
        console.error("Failed to fetch user name:", err.response?.data || err.message);
      }
    };
    fetchUserName();
  }, [formData.userId, navigate, scheduleId, userId]); // Added scheduleId, userId

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId || !formData.scheduleId) {
      alert("Missing user ID or schedule ID. Redirecting to dashboard.");
      navigate("/user-dashboard");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:5000/schedule-change-requests", formData);
      alert("Change request submitted successfully!");
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Submission error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      alert(err.response?.data?.message || "Failed to submit change request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="change-request-page">
      <div className="change-request-container">
        <h1>Request Schedule Changes Here</h1>
        <form onSubmit={handleSubmit} className="change-request-form">
          <textarea
            name="changeDetails"
            value={formData.changeDetails}
            onChange={handleChange}
            placeholder="Describe the changes you want to make to your schedule..."
            required
            disabled={isSubmitting}
          />
          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/user-dashboard")}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <footer className="change-request-footer">
        <p>&copy; 2025 Your Gym Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ScheduleChangeRequestForm;