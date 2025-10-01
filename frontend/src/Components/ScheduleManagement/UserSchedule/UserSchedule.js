// src/Components/ScheduleManagement/UserSchedule/UserSchedule.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSchedule.css";

function UserSchedule({ userId }) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/user-schedule-creations/user/${userId}`)
      .then((res) => {
        setSchedule(res.data.creation);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setSchedule(null);
        }
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p className="loading-text">Loading schedule...</p>;

  return (
    <div className="schedule-page">
      <header className="schedule-header">
        <h1>My Gym Schedule</h1>
      </header>
      <div className="schedule-container">
        <h2>📅 My Schedule</h2>
        {schedule ? (
          <div className="schedule-card">
            <p><strong>User:</strong> {schedule.userName}</p>
            <p><strong>Time Slot:</strong> {schedule.timeSlot}</p>
            <p><strong>Schedule:</strong></p>
            <pre className="schedule-text">{schedule.schedule}</pre>
            <div className="button-group">
              
              <button
                className="change-request-btn"
                onClick={() => navigate("/schedule-change-request", { state: { scheduleId: schedule._id, userId } })} // NEW: Navigate to change request form
              >
                Request for Changes
              </button>
            </div>
          </div>
        ) : (
          <p className="no-schedule">No schedule available</p>
        )}
      </div>
      <footer className="schedule-footer">
        <p>&copy; 2025 Your Gym Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default UserSchedule;