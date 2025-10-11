import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css";

export default function UserProfile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contactNo: "",
    dob: "",
    gender: "",
    profileImage: "",
  });
  const [previewImage, setPreviewImage] = useState("/images/profile.png");

  // --- Change Password State ---
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!userId) return navigate("/login");

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${userId}`);
        const u = res.data.user;
        setUser(u);
        setFormData({
          userName: u.userName || "",
          email: u.email || "",
          contactNo: u.contactNo || "",
          dob: u.dob ? u.dob.split("T")[0] : "",
          gender: u.gender || "",
          profileImage: u.profileImage || "",
        });
        setPreviewImage(u.profileImage ? `http://localhost:5000${u.profileImage}` : "/images/profile.png");
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("Failed to load profile.");
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  // --- Validation Function ---
  const validateForm = async () => {
    if (!formData.userName.trim()) return alert("Username is required!");
    if (!formData.email.trim()) return alert("Email is required!");
    if (!formData.contactNo.trim()) return alert("Contact number is required!");
    if (!/^\d{10}$/.test(formData.contactNo))
      return alert("Contact number must be exactly 10 digits!");
    if (!formData.dob) return alert("Date of Birth is required!");
    if (!formData.gender) return alert("Gender is required!");

    // Check username uniqueness
    try {
      const checkResponse = await axios.get(
        `http://localhost:5000/users/check-username/${encodeURIComponent(formData.userName)}`
      );
      if (checkResponse.data.exists && formData.userName !== user.userName)
        return alert("Username already exists! Please choose another.");
    } catch (err) {
      console.error("Username check error:", err);
      return alert("Failed to check username availability");
    }

    return true;
  };

  const handleSave = async () => {
    const valid = await validateForm();
    if (!valid) return;

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profileImage" && formData[key] instanceof File) {
          data.append("profileImage", formData[key]);
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await axios.put(`http://localhost:5000/users/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      setPreviewImage(res.data.user.profileImage ? `http://localhost:5000${res.data.user.profileImage}` : "/images/profile.png");
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      alert("Account deleted successfully!");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (err) {
      console.error("Error deleting account:", err);
      alert("Failed to delete account.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // --- Handle Change Password ---
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      return alert("All password fields are required.");
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("New password and confirm password do not match.");
    }
    if (passwordData.newPassword.length < 6) {
      return alert("New password must be at least 6 characters long.");
    }

    try {
      const res = await axios.put(`http://localhost:5000/users/${userId}/change-password`, passwordData);
      alert(res.data.message);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error("Error updating password:", err);
      alert(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-info">
        <div className="profile-image">
          <img src={previewImage} alt="Profile" />
          {isEditing && <input type="file" onChange={handleImageChange} />}
        </div>

        <label>User Name:</label>
        {isEditing ? (
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        ) : (
          <span>{user.userName}</span>
        )}

        <label>Email:</label>
        {isEditing ? (
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        ) : (
          <span>{user.email}</span>
        )}

        <label>Contact No:</label>
        {isEditing ? (
          <input type="text" name="contactNo" value={formData.contactNo} onChange={handleChange} />
        ) : (
          <span>{user.contactNo || "-"}</span>
        )}

        <label>Date of Birth:</label>
        {isEditing ? (
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        ) : (
          <span>{user.dob ? user.dob.split("T")[0] : "-"}</span>
        )}

        <label>Gender:</label>
        {isEditing ? (
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <span>{user.gender || "-"}</span>
        )}

        <label>Role:</label>
        <span>{user.role}</span>
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">Save Changes</button>
        ) : (
          <button onClick={handleEditToggle}>Edit Profile</button>
        )}
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDelete} className="delete-btn">Delete Account</button>
      </div>

      {/* --- Change Password Section --- */}
      <div className="change-password">
        <h3>Change Password</h3>

        <label>Current Password:</label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
        />

        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
        />

        <label>Confirm New Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
        />

        <button onClick={handleUpdatePassword} className="save-btn">
          Update Password
        </button>
      </div>
    </div>
  );
}
