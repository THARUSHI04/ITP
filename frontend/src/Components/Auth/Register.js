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
    reEnterPassword: "", // Re-enter password field
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
    const { userName, email, password, reEnterPassword, contactNo, role, dob, hours, membershipFee, address, expertise, experience, joiningDate } = formData;

    if (!userName.trim()) return alert("Username is required!");
    if (!email.trim()) return alert("Email is required!");
    if (!password.trim()) return alert("Password is required!");
    if (!reEnterPassword.trim()) return alert("Please re-enter your password!");
    if (password !== reEnterPassword) return alert("Passwords do not match!");
    if (!contactNo.trim()) return alert("Contact number is required!");
    if (!/^\d{10}$/.test(contactNo)) return alert("Contact number must be exactly 10 digits!");
    if (role !== "gym" && !dob) return alert("Date of Birth is required!");

    // Check username availability
    try {
      const check = await axios.get(`http://localhost:5000/users/check-username/${encodeURIComponent(userName)}`);
      if (check.data.exists) return alert("Username already exists!");
    } catch (err) {
      console.error(err);
      return alert("Failed to check username availability");
    }

    // Role-specific validations
    if (role === "gym") {
      if (!address.trim()) return alert("Gym address is required!");
      if (!hours || Number(hours) <= 0) return alert("Opening hours must be positive!");
      if (!membershipFee || Number(membershipFee) <= 0) return alert("Membership fee must be positive!");
    }

    if (role === "trainer") {
      if (!expertise.trim()) return alert("Trainer expertise is required!");
      if (experience === "" || Number(experience) < 0) return alert("Experience must be 0 or positive!");
      formData.sessionType = "Online";
    }

    if (role === "admin") {
      if (!joiningDate) return alert("Joining date is required!");
      const today = new Date().toISOString().split("T")[0];
      if (joiningDate > today) return alert("Joining date cannot be in the future!");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = await validateForm();
    if (!valid) return;

    try {
      // --- Send form data as JSON --- backend handles password hashing
      await axios.post("http://localhost:5000/users", formData);

      alert("User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
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
          <label>Username *</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />

          <label>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />

          <label>Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />

          <label>Re-enter Password *</label>
          <input type="password" name="reEnterPassword" value={formData.reEnterPassword} onChange={handleChange} />

          <label>Contact Number *</label>
          <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} />

          {formData.role !== "gym" && (
            <>
              <label>Date of Birth *</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </>
          )}

          <label>Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Role *</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="trainer">Trainer</option>
            <option value="gym">Gym</option>
            <option value="admin">Admin</option>
          </select>

          {/* Role-specific fields */}
          {formData.role === "gym" && (
            <>
              <label>Gym Address *</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
              <label>Opening Hours *</label>
              <input type="number" name="hours" value={formData.hours} onChange={handleChange} />
              <label>Membership Fee *</label>
              <input type="number" name="membershipFee" value={formData.membershipFee} onChange={handleChange} />
              <label>Facilities</label>
              <input type="text" name="facilities" value={formData.facilities} onChange={handleChange} />
              <label>Gym Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
            </>
          )}

          {formData.role === "trainer" && (
            <>
              <label>Expertise *</label>
              <input type="text" name="expertise" value={formData.expertise} onChange={handleChange} />
              <label>Experience</label>
              <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
              <label>Biography</label>
              <textarea name="biography" value={formData.biography} onChange={handleChange}></textarea>
              <label>Session Type</label>
              <input type="text" value="Online" readOnly />
            </>
          )}

          {formData.role === "admin" && (
            <>
              <label>Joining Date *</label>
              <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </>
          )}

          <button type="submit" className="register-button">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")} className="link-text">Login here</span>
        </p>
      </div>
    </div>
  );
}
