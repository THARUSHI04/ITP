import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    contactNo: "",
    dob: "",
    gender: "Male",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/users", formData);
      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="Username" value={formData.userName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
          <option value="gym">Gym</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="link-text">Login here</span>
      </p>
    </div>
  );
}

export default Register;
