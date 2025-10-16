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
  const [previewImage, setPreviewImage] = useState("/images/profile.png");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    reEnterPassword: "",
  });

  // --- Fetch user data ---
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
          profileImage: "",
        });
        setPreviewImage(u.profileImage ? `http://localhost:5000${u.profileImage}` : "/images/profile.png");
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

  // --- Form Validation ---
  const validateForm = async () => {
    if (!formData.userName.trim()) return alert("Username is required!");
    if (!formData.email.trim()) return alert("Email is required!");
    if (!formData.contactNo.trim()) return alert("Contact number is required!");
    if (!/^\d{10}$/.test(formData.contactNo)) return alert("Contact number must be exactly 10 digits!");
    if (!formData.dob) return alert("Date of Birth is required!");
    if (!formData.gender) return alert("Gender is required!");
    if (!formData.joiningDate) return alert("Joining date is required!");
    const today = new Date().toISOString().split("T")[0];
    if (formData.joiningDate > today) return alert("Joining date cannot be in the future!");

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

  // --- Handle Password Change ---
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, reEnterPassword } = passwordData;

    if (!currentPassword || !newPassword || !reEnterPassword)
      return alert("All password fields are required.");

    if (newPassword !== reEnterPassword)
      return alert("New password and re-enter password do not match.");

    if (newPassword.length < 6)
      return alert("New password must be at least 6 characters long.");

    try {
      const res = await axios.put(
        `http://localhost:5000/users/${userId}/change-password`,
        { currentPassword, newPassword, reEnterPassword }
      );
      alert(res.data.message);
      setPasswordData({ currentPassword: "", newPassword: "", reEnterPassword: "" });
    } catch (err) {
      console.error("Error updating password:", err);
      alert(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Admin Profile</h2>

      <div className="profile-info">
        <div className="profile-image">
          <img src={previewImage} alt="Profile" />
          {isEditing && <input type="file" onChange={handleImageChange} />}
        </div>

        {["userName", "email", "contactNo", "dob", "gender", "joiningDate", "notes"].map((field) => (
          <div key={field}>
            <label>{field === "userName" ? "Username" : field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            {isEditing ? (
              field === "notes" ? (
                <textarea name={field} value={formData[field]} onChange={handleChange}></textarea>
              ) : field === "gender" ? (
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <input
                  type={field === "dob" || field === "joiningDate" ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              )
            ) : (
              <span>{user[field] || "-"}</span>
            )}
          </div>
        ))}

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

        <label>Re-enter New Password:</label>
        <input
          type="password"
          name="reEnterPassword"
          value={passwordData.reEnterPassword}
          onChange={handlePasswordChange}
        />

        <button onClick={handleUpdatePassword} className="save-btn">Update Password</button>
      </div>
    </div>
  );
}
