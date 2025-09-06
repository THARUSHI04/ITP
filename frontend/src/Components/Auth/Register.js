import React from "react";
import "./Register.css";

function Register() {
  return (
    <div className="register">
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <select required>
          <option value="user">User</option>
          <option value="coach">Coach</option>
          <option value="gym">Gym</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
