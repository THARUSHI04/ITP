import React, { useState } from "react";
import axios from "axios";
import "./ScheduleRequestForm.css";

function ScheduleRequestForm() {
  const [inputs, setInputs] = useState({
    userName: "",
    age: "",
    contactNo: "",
    weight: "",
    height: "",
    weeklyFrequence: "",
    specificType: "",
    preferedExercise: "",
  });

  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please log in to submit a schedule request.");
    return null;
  }

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Validation only for text/number fields
  const validate = () => {
    const newErrors = {};

    if (!/^[a-zA-Z ]{3,50}$/.test(inputs.userName)) {
      newErrors.userName = "Name should contain only letters and spaces (3-50 chars).";
    }

    const ageNum = Number(inputs.age);
    if (!ageNum || ageNum < 10 || ageNum > 100) {
      newErrors.age = "Age must be between 10 and 100.";
    }

    if (!/^\d{10}$/.test(inputs.contactNo)) {
      newErrors.contactNo = "Contact number must be exactly 10 digits.";
    }

    const weightNum = Number(inputs.weight);
    if (!weightNum || weightNum < 30 || weightNum > 300) {
      newErrors.weight = "Weight must be between 30 and 300 kg.";
    }

    const heightNum = Number(inputs.height);
    if (!heightNum || heightNum < 100 || heightNum > 250) {
      newErrors.height = "Height must be between 100 and 250 cm.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:5000/schedules", {
        userId,
        userName: inputs.userName,
        age: Number(inputs.age),
        contactNo: Number(inputs.contactNo),
        weight: Number(inputs.weight),
        height: Number(inputs.height),
        weeklyFrequence: Number(inputs.weeklyFrequence),
        specificType: inputs.specificType,
        preferedExercise: inputs.preferedExercise,
      });
      return response.data;
    } catch (err) {
      console.error("Error submitting schedule:", err);
      alert("Failed to submit schedule. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = await sendRequest();
      if (data) {
        alert("Schedule request submitted successfully!");
        setInputs({
          userName: "",
          age: "",
          contactNo: "",
          weight: "",
          height: "",
          weeklyFrequence: "",
          specificType: "",
          preferedExercise: "",
        });
        setErrors({});
      }
    } else {
      alert("Please fix the errors in the form before submitting.");
    }
  };

  return (
    <div className="schedule-page">
      <div className="form-container">
        <h2 className="form-title">Schedule Request</h2>
        <form onSubmit={handleSubmit} className="schedule-form">
          <label>Full Name</label>
          <input
            type="text"
            name="userName"
            value={inputs.userName}
            onChange={handleChange}
            required
          />
          {errors.userName && <p className="error">{errors.userName}</p>}

          <div className="form-row">
            <div>
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={inputs.age}
                onChange={handleChange}
                required
              />
              {errors.age && <p className="error">{errors.age}</p>}
            </div>
            <div>
              <label>Contact No</label>
              <input
                type="text"
                name="contactNo"
                value={inputs.contactNo}
                onChange={handleChange}
                required
              />
              {errors.contactNo && <p className="error">{errors.contactNo}</p>}
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={inputs.weight}
                onChange={handleChange}
                required
              />
              {errors.weight && <p className="error">{errors.weight}</p>}
            </div>
            <div>
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={inputs.height}
                onChange={handleChange}
                required
              />
              {errors.height && <p className="error">{errors.height}</p>}
            </div>
          </div>

          {/* Dropdowns remain unchanged */}
          <label>Weekly Frequency</label>
          <select
            name="weeklyFrequence"
            value={inputs.weeklyFrequence}
            onChange={handleChange}
            required
          >
            <option value="">Select days per week</option>
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} day(s) per week
              </option>
            ))}
          </select>

          <label>Specific Training Type</label>
          <select
            name="specificType"
            value={inputs.specificType}
            onChange={handleChange}
            required
          >
            <option value="">Select training type</option>
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
            value={inputs.preferedExercise}
            onChange={handleChange}
            required
          >
            <option value="">Select preferred exercise</option>
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
