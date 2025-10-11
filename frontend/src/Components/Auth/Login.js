import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users/login", credentials);
      const loggedInUser = res.data.user || res.data;

      localStorage.setItem("userId", loggedInUser._id);
      const role = loggedInUser.role?.toLowerCase();
      if (role) {
        localStorage.setItem("role", role);
      } else {
        localStorage.removeItem("role");
      }
      alert("Login successful!");

      switch (role) {
        case "user":
          navigate("/user-dashboard", { state: { userId: loggedInUser._id } });
          break;
        case "trainer":
          navigate("/instructor-dashboard", { state: { userId: loggedInUser._id } });
          break;
        case "gym":
          navigate("/gym-dashboard", { state: { userId: loggedInUser._id } });
          break;
        case "admin":
          navigate("/admin-dashboard", { state: { userId: loggedInUser._id } });
          break;
        default:
          navigate("/", { state: { userId: loggedInUser._id } });
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">
          <img src="/favicon.ico" alt="" /> Sign In
        </h2>
        <p className="case-sensitive-text">Username and Password are case sensitive.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your username"
            value={credentials.userName}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")} className="link-text">
            Register here
          </span>
        </p>

        <p className="copyright-text">
          Copyright © CorePlusPlatform
        </p>
      </div>
    </div>
  );
}
