import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", inputs);
      const user = response.data.user || response.data; // handle either case

      alert("Login successful!");

      // Navigate based on role
      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "trainer":
          navigate("/instructor-dashboard");
          break;
        case "gym":
          navigate("/gym-dashboard");
          break;
        case "user":
          navigate("/user-dashboard");
          break;
        default:
          alert("Unknown role. Redirecting to home.");
          navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back 👋</h1>
        <p className="login-subtitle">Log in to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={inputs.userName}
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

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="register-link">
          Don’t have an account?{" "}
          <button onClick={() => navigate("/register")}>Register Now</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
