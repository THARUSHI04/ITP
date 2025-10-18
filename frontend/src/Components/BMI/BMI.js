import React, { useState } from "react";
import "./BMI.css";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    // Validation for negative or zero values
    if (height <= 0 || weight <= 0) {
      alert("Height and weight must be greater than 0!");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("Underweight 😐");
    else if (bmiValue < 25) setStatus("Normal ✅");
    else if (bmiValue < 30) setStatus("Overweight ⚠️");
    else setStatus("Obese 🚫");
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
  };

  return (
    <div className="bmi-page">
      <div className="bmi-container">
        <h1 className="bmi-title">
          <span className="highlight">BMI</span> Calculator
        </h1>
        <p className="bmi-subtitle">
          Know your Body Mass Index and take the first step towards your fitness
          goals.
        </p>

        <form className="bmi-form" onSubmit={calculateBMI}>
          <div className="bmi-input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>

          <div className="bmi-input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>

          <div className="bmi-buttons">
            <button type="submit" className="btn-primary">
              Calculate
            </button>
            <button
              type="button"
              className="btn-tertiary"
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>

        {bmi && (
          <div className="bmi-result">
            <h2>Your BMI: {bmi}</h2>
            <p className="bmi-status">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BMI;
