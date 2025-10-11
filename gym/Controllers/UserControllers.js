const mongoose = require("mongoose");
const User = require("../Model/UserModel");
const fs = require("fs");
const path = require("path");
const { sendWelcomeEmail } = require("../utils/emailService");

// --- Save profile image and return relative path ---
const saveProfileImage = (file) => {
  if (!file) return "/images/profile.png";

  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const fileName = Date.now() + "-" + file.originalname;
  const filePath = path.join(uploadDir, fileName);
  fs.renameSync(file.path, filePath);

  return `/uploads/${fileName}`;
};

// --- Check username availability ---
const checkUsername = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    res.status(200).json({ exists: !!user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Get all users ---
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Add new user ---
const addUsers = async (req, res) => {
  try {
    const profileImage = req.file ? saveProfileImage(req.file) : "/images/profile.png";
    const newUser = new User({
      ...req.body,
      profileImage,
      dob: req.body.dob ? new Date(req.body.dob) : undefined,
      joiningDate: req.body.joiningDate ? new Date(req.body.joiningDate) : undefined,
      experience: req.body.experience ? Number(req.body.experience) : undefined,
      membershipFee: req.body.membershipFee ? Number(req.body.membershipFee) : undefined,
      isDisabled: req.body.isDisabled || false,
    });

    const savedUser = await newUser.save();
    
    // Send welcome email for new user registrations
    try {
      await sendWelcomeEmail(savedUser.email, savedUser.userName);
      console.log("Welcome email sent successfully to:", savedUser.email);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the registration if email fails
    }

    res.status(201).json({ user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to add user", error: err.message });
  }
};

// --- Get user by ID ---
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Update user (Admin + User) ---
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // --- Explicit updates ---
    if (req.body.role !== undefined) user.role = req.body.role.toLowerCase();
    if (req.body.isDisabled !== undefined) user.isDisabled = req.body.isDisabled;

    // --- Update other fields ---
    Object.keys(req.body).forEach((key) => {
      if (key !== "role" && key !== "isDisabled" && key !== "profileImage") {
        if (key === "dob" || key === "joiningDate") {
          user[key] = req.body[key] ? new Date(req.body[key]) : undefined;
        } else if (key === "experience" || key === "membershipFee") {
          user[key] = req.body[key] ? Number(req.body[key]) : undefined;
        } else {
          user[key] = req.body[key];
        }
      }
    });

    // --- Update profile image if provided ---
    if (req.file) user.profileImage = saveProfileImage(req.file);

    const savedUser = await user.save();
    res.status(200).json({ user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

// --- Delete user ---
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- Login user ---
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isDisabled) return res.status(403).json({ message: "User account is disabled" });
    if (user.password !== password) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// --- Change password ---
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== currentPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password", error: err.message });
  }
};

module.exports = {
  checkUsername,
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
  loginUser,
  changePassword,
};
