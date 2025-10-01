// src/Components/ScheduleManagement/ScheduleChangeRequest/ScheduleChangeRequestForm.js
import React, { useState, useEffect } from "react"; // NEW: Added useEffect
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ScheduleChangeRequestForm.css";

function ScheduleChangeRequestForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { scheduleId, userId } = state || {};

  const [formData, setFormData] = useState({
    scheduleId: scheduleId || "",
    userId: userId || localStorage.getItem("userId") || "",
    userName: "", // NEW: Added userName
    changeDetails: "",
  });

  // NEW: Fetch userName based on userId
  useEffect(() => {
    if (!formData.userId) return;

    const fetchUserName = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${formData.userId}`);
        setFormData((prev) => ({ ...prev, userName: res.data.user.userName }));
      } catch (err) {
        console.error("Failed to fetch user name:", err);
      }
    };
    fetchUserName();
  }, [formData.userId]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/schedule-change-requests", formData);
      alert("Change request submitted successfully!");
      navigate("/instructor-dashboard/requests"); // UPDATED: Navigate to instructor's Schedule Requests tab
    } catch (err) {
      console.error("Failed to submit change request:", err);
      alert("Failed to submit change request. Please try again.");
    }
  };

  return (
    <div className="change-request-page">
      <header className="change-request-header">
        <h1>Request Schedule Change</h1>
      </header>
      <div className="change-request-container">
        <h2>Submit Change Request</h2>
        <form onSubmit={handleSubmit} className="change-request-form">
          <label>Change Details</label>
          <textarea
            name="changeDetails"
            value={formData.changeDetails}
            onChange={handleChange}
            placeholder="Describe the changes you want to make to your schedule..."
            required
          />
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              Submit Request
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
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