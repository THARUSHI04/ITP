import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    userName: "",
    email: "",
    password: "",
    contactNo: "",
    dob: "",
    gender: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/users", {
      ...inputs,
    });
    return response.data;
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Register</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={inputs.userName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="text"
            name="contactNo"
            placeholder="Contact Number"
            value={inputs.contactNo}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="date"
            name="dob"
            value={inputs.dob}
            onChange={handleChange}
            required
            className="input"
          />
          <select
            name="gender"
            value={inputs.gender}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="role"
            placeholder="Role (e.g., trainer)"
            value={inputs.role}
            onChange={handleChange}
            required
            className="input"
          />

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
