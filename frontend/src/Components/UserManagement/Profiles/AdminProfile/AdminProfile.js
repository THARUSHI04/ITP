// src/Components/Profile/Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css";

export default function Profile() {
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
  const [previewImage, setPreviewImage] = useState("");

  // Fetch user info
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
          profileImage: u.profileImage || "/uploads/default-profile.png",
        });
        setPreviewImage(u.profileImage || "/uploads/default-profile.png");
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("Failed to load profile.");
      }
    };

    fetchUser();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("contactNo", formData.contactNo);
      data.append("dob", formData.dob);
      data.append("gender", formData.gender);
      if (formData.profileImage instanceof File) {
        data.append("profileImage", formData.profileImage);
      }

      const res = await axios.put(`http://localhost:5000/users/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      setFormData({
        ...formData,
        profileImage: res.data.user.profileImage,
      });
      setPreviewImage(res.data.user.profileImage);
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

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-info">
        <div className="profile-image">
          <img src={previewImage} alt="Profile" />
          {isEditing && <input type="file" onChange={handleImageChange} />}
        </div>

        <label>Username:</label>
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

      {/* Buttons at the bottom */}
      <div className="profile-actions">
        {isEditing ? (
          <button onClick={handleSave} className="save-btn">Save Changes</button>
        ) : (
          <button onClick={handleEditToggle}>Edit Profile</button>
        )}
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDelete} className="delete-btn">Delete Account</button>
      </div>
    </div>
  );
}
