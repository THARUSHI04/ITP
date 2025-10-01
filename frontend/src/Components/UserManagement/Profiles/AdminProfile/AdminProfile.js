import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css";

export default function AdminProfile() {
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
    joiningDate: "",
    notes: "",
    profileImage: "",
  });
  const [previewImage, setPreviewImage] = useState("");

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
          joiningDate: u.joiningDate ? u.joiningDate.split("T")[0] : "",
          notes: u.notes || "",
          profileImage: u.profileImage || "/uploads/default-profile.png",
        });
        setPreviewImage(u.profileImage || "/uploads/default-profile.png");
      } catch (err) {
        console.error("Error fetching admin:", err);
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

  const handleSave = async () => {
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
      setFormData({ ...formData, profileImage: res.data.user.profileImage });
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
      <h2>Admin Profile</h2>

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
            <option value="Other">Other</option>
          </select>
        ) : (
          <span>{user.gender || "-"}</span>
        )}

        <label>Date of Joining:</label>
        {isEditing ? (
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
        ) : (
          <span>{user.joiningDate ? user.joiningDate.split("T")[0] : "-"}</span>
        )}

        <label>Notes / Remarks:</label>
        {isEditing ? (
          <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
        ) : (
          <span>{user.notes || "-"}</span>
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
    </div>
  );
}
