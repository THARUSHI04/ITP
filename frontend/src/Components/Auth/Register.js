import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    contactNo: "",
    dob: "",
    gender: "Male",
    role: "user",
    address: "",
    hours: "",
    membershipFee: "",
    facilities: "",
    description: "",
    expertise: "",
    experience: "",
    biography: "",
    sessionType: "Online",
    joiningDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = async () => {
    // Common validations
    if (!formData.userName.trim()) return alert("Username is required!");
    if (!formData.email.trim()) return alert("Email is required!");
    if (!formData.password.trim()) return alert("Password is required!");
    if (!formData.contactNo.trim()) return alert("Contact number is required!");
    if (formData.contactNo.length !== 10) return alert("Contact number must be exactly 10 digits!");
    if (formData.role !== "gym" && !formData.dob) return alert("Date of Birth is required!");

    // Check if username exists
    try {
      const checkResponse = await axios.get(`http://localhost:5000/users/check-username/${encodeURIComponent(formData.userName)}`
);
      if (checkResponse.data.exists) {
        return alert("Username already exists! Please choose another.");
      }
    } catch (err) {
      console.error("Username check error:", err);
      return alert("Failed to check username availability");
    }

    // Role-specific validations
    if (formData.role === "gym") {
      if (!formData.address.trim()) return alert("Gym address is required!");
      if (!formData.hours || Number(formData.hours) <= 0) return alert("Opening hours must be a positive number!");
      if (!formData.membershipFee || Number(formData.membershipFee) <= 0) return alert("Membership fee must be a positive number!");
    }

    if (formData.role === "trainer") {
      if (!formData.expertise.trim()) return alert("Trainer expertise is required!");
      if (formData.experience === "" || Number(formData.experience) < 0) return alert("Experience must be 0 or positive!");
      formData.sessionType = "Online"; // enforce online only
    }

    if (formData.role === "admin") {
      if (!formData.joiningDate) return alert("Joining date is required!");
      const today = new Date().toISOString().split("T")[0];
      if (formData.joiningDate > today) return alert("Joining date cannot be in the future!");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await validateForm();
    if (!valid) return;

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
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">
          <img src="/favicon.ico" alt="Logo" /> Create Account
        </h2>
        <form className="register-form" onSubmit={handleSubmit}>

          {/* Common Fields */}
          <label htmlFor="userName">Username <span className="required">*</span></label>
          <input type="text" id="userName" name="userName" placeholder="Enter your username" value={formData.userName} onChange={handleChange} />

          <label htmlFor="email">Email <span className="required">*</span></label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />

          <label htmlFor="password">Password <span className="required">*</span></label>
          <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />

          <label htmlFor="contactNo">Contact Number <span className="required">*</span></label>
          <input type="text" id="contactNo" name="contactNo" placeholder="Enter 10-digit contact number" value={formData.contactNo} onChange={handleChange} />

          {formData.role !== "gym" && (
            <>
              <label htmlFor="dob">Date of Birth <span className="required">*</span></label>
              <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            </>
          )}

          <label htmlFor="gender">Gender <span className="required">*</span></label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label htmlFor="role">Role <span className="required">*</span></label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="trainer">Trainer</option>
            <option value="gym">Gym</option>
            <option value="admin">Admin</option>
          </select>

          {/* Gym Fields */}
          {formData.role === "gym" && (
            <>
              <label htmlFor="address">Gym Address <span className="required">*</span></label>
              <input type="text" id="address" name="address" placeholder="Gym Address" value={formData.address} onChange={handleChange} />

              <label htmlFor="hours">Opening Hours <span className="required">*</span></label>
              <input type="number" id="hours" name="hours" placeholder="Opening Hours" value={formData.hours} onChange={handleChange} />

              <label htmlFor="membershipFee">Membership Fee <span className="required">*</span></label>
              <input type="number" id="membershipFee" name="membershipFee" placeholder="Membership Fee" value={formData.membershipFee} onChange={handleChange} />

              <label htmlFor="facilities">Facilities</label>
              <input type="text" id="facilities" name="facilities" placeholder="Facilities" value={formData.facilities} onChange={handleChange} />

              <label htmlFor="description">Gym Description</label>
              <textarea id="description" name="description" placeholder="Describe your gym" value={formData.description} onChange={handleChange}></textarea>
            </>
          )}

          {/* Trainer Fields */}
          {formData.role === "trainer" && (
            <>
              <label htmlFor="expertise">Expertise <span className="required">*</span></label>
              <input type="text" id="expertise" name="expertise" placeholder="Trainer Expertise" value={formData.expertise} onChange={handleChange} />

              <label htmlFor="experience">Experience (Years)</label>
              <input type="number" id="experience" name="experience" placeholder="Experience in years" value={formData.experience} onChange={handleChange} />

              <label htmlFor="biography">Biography</label>
              <textarea id="biography" name="biography" placeholder="Write a short biography" value={formData.biography} onChange={handleChange}></textarea>

              <label htmlFor="sessionType">Session Type</label>
              <input type="text" value="Online" readOnly />
            </>
          )}

          {/* Admin Fields */}
          {formData.role === "admin" && (
            <>
              <label htmlFor="joiningDate">Joining Date <span className="required">*</span></label>
              <input type="date" id="joiningDate" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />

              <label htmlFor="notes">Notes</label>
              <textarea id="notes" name="notes" placeholder="Admin notes" value={formData.notes} onChange={handleChange}></textarea>
            </>
          )}

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link-text">Login here</span>
        </p>

        <p className="copyright-text">© CorePlusPlatform</p>
      </div>
    </div>
  );
}
