import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/users/login", credentials);

      // Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful!");

      // ✅ Redirect based on role
      const role = res.data.role?.toLowerCase();

      switch (role) {
        case "user":
          navigate("/user-dashboard");
          break;
        case "trainer":
          navigate("/instructor-dashboard");
          break;
        case "gym":
          navigate("/gym-dashboard");
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/"); // fallback
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={credentials.userName}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <span onClick={() => navigate("/register")} className="link-text">
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
