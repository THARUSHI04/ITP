import React, { useState } from "react";
import "./ScheduleRequestForm.css";

function ScheduleRequestForm() {
  const [formData, setFormData] = useState({
    userName: "",
    age: "",
    contactNo: "",
    weight: "",
    height: "",
    weeklyFrequence: "3",
    specificType: "Weight Loss",
    preferedExercise: "Cardio",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Schedule request submitted successfully!");
        setFormData({
          userName: "",
          age: "",
          contactNo: "",
          weight: "",
          height: "",
          weeklyFrequence: "3",
          specificType: "Weight Loss",
          preferedExercise: "Cardio",
        });
      } else {
        alert("❌ Failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting schedule");
    }
  };

  return (
    <div className="schedule-page">
      <div className="form-container">
        <h2 className="form-title">Schedule Request</h2>
        <form onSubmit={handleSubmit} className="schedule-form">
          {/* Personal Info */}
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />

          <div className="form-row">
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Contact No</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Body Details */}
          <div className="form-row">
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Preferences */}
          <label>Weekly Frequency</label>
          <select
            name="weeklyFrequence"
            value={formData.weeklyFrequence}
            onChange={handleChange}
            required
          >
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} day(s) per week
              </option>
            ))}
          </select>

          <label>Specific Training Type</label>
          <select
            name="specificType"
            value={formData.specificType}
            onChange={handleChange}
            required
          >
            <option value="Weight Loss">Weight Loss</option>
            <option value="Gain Weight">Gain Weight</option>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Reduce Upper Body">Reduce Upper Body</option>
            <option value="Reduce Stomach">Reduce Stomach</option>
            <option value="Endurance">Endurance</option>
            <option value="Flexibility">Flexibility</option>
          </select>

          <label>Preferred Exercises</label>
          <select
            name="preferedExercise"
            value={formData.preferedExercise}
            onChange={handleChange}
            required
          >
            <option value="Cardio">Cardio</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="Yoga">Yoga</option>
            <option value="CrossFit">CrossFit</option>
            <option value="HIIT">HIIT</option>
            <option value="Pilates">Pilates</option>
            <option value="Mixed Training">Mixed Training</option>
          </select>

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleRequestForm;
