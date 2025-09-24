import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For back button
import "./InstructorSchedulePage.css";

const InstructorSchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [filteredSchedule, setFilteredSchedule] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({ schedule: "", timeSlot: "" });

  const navigate = useNavigate();
  const URL = "http://localhost:5000/user-schedule-creations";

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(URL);
        setSchedules(res.data.creations);
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    };
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const schedule = schedules.find((s) => s.userId === selectedUserId);
      setFilteredSchedule(schedule ?? null);
      if (schedule) {
        setEditedSchedule({ schedule: schedule.schedule, timeSlot: schedule.timeSlot });
      }
    } else {
      setFilteredSchedule(null);
    }
  }, [selectedUserId, schedules]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSchedule((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!filteredSchedule) return;
    try {
      const res = await axios.put(`${URL}/${filteredSchedule._id}`, editedSchedule);
      alert("Schedule updated successfully!");
      setSchedules((prev) =>
        prev.map((s) => (s._id === filteredSchedule._id ? res.data.creation : s))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update schedule.");
    }
  };

  const handleDelete = async () => {
    if (!filteredSchedule) return;
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      await axios.delete(`${URL}/${filteredSchedule._id}`);
      alert("Schedule deleted successfully!");
      setSchedules((prev) => prev.filter((s) => s._id !== filteredSchedule._id));
      setSelectedUserId("");
    } catch (err) {
      console.error(err);
      alert("Failed to delete schedule.");
    }
  };

  return (
    <div className="instructor-schedule-page">
      <button className="back-btn" onClick={() => navigate("/instructor-dashboard")}>
        &larr; Back to Dashboard
      </button>

      <h2>Instructor Schedule Management</h2>

      {/* Search dropdown */}
      <label>Search by User ID:</label>
      <select
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
      >
        <option value="">-- Select User --</option>
        {schedules.map((s) => (
          <option key={s._id} value={s.userId}>
            {s.userName} ({s.userId})
          </option>
        ))}
      </select>

      {/* Display selected schedule */}
      {filteredSchedule && (
        <div className="schedule-card">
          <h3>Schedule Details</h3>
          <p><strong>User Name:</strong> {filteredSchedule.userName}</p>
          
          <p>
            <strong>Schedule:</strong>
            <textarea
              name="schedule"
              value={editedSchedule.schedule}
              onChange={handleChange}
            />
          </p>

          <p>
            <strong>Time Slot:</strong>
            <input
              type="text"
              name="timeSlot"
              value={editedSchedule.timeSlot}
              onChange={handleChange}
            />
          </p>

          {/* Action buttons */}
          <div className="btn-group">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorSchedulePage;
