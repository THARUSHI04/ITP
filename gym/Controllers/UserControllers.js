const mongoose = require("mongoose");
const User = require("../Model/UserModel");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const { sendWelcomeEmail } = require("../utils/emailService");

// --- Save profile image ---
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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// --- Add new user (Registration) ---
const addUsers = async (req, res) => {
  try {
    const { password, reEnterPassword } = req.body;

    if (!password || !reEnterPassword)
      return res.status(400).json({ message: "Password fields are required" });

    if (password !== reEnterPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImage = req.file ? saveProfileImage(req.file) : "/images/profile.png";

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      profileImage,
      dob: req.body.dob ? new Date(req.body.dob) : undefined,
      joiningDate: req.body.joiningDate ? new Date(req.body.joiningDate) : undefined,
      experience: req.body.experience ? Number(req.body.experience) : undefined,
      membershipFee: req.body.membershipFee ? Number(req.body.membershipFee) : undefined,
      isDisabled: req.body.isDisabled || false,
      role: req.body.role ? req.body.role.toLowerCase() : "user",
    });

    const savedUser = await newUser.save();

    // Send welcome email (non-blocking)
    try {
      await sendWelcomeEmail(savedUser.email, savedUser.userName);
      console.log("Welcome email sent to:", savedUser.email);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    res.status(201).json({ user: savedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to add user", error: err.message });
  }
};

// --- Login user ---
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const user = await User.findOne({ userName });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isDisabled) return res.status(403).json({ message: "User account is disabled" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// --- Change password ---
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, reEnterPassword } = req.body;

    if (!currentPassword || !newPassword || !reEnterPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) return res.status(401).json({ message: "Current password is incorrect" });

    if (newPassword !== reEnterPassword)
      return res.status(400).json({ message: "New passwords do not match" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password", error: err.message });
  }
};

// --- Get all users ---
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// --- Get user by ID ---
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// --- Update user ---
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update role / isDisabled explicitly
    if (req.body.role) user.role = req.body.role.toLowerCase();
    if (req.body.isDisabled !== undefined) user.isDisabled = req.body.isDisabled;

    // Update other fields
    Object.keys(req.body).forEach((key) => {
      if (!["role", "isDisabled", "password", "profileImage"].includes(key)) {
        if (key === "dob" || key === "joiningDate") user[key] = req.body[key] ? new Date(req.body[key]) : undefined;
        else if (key === "experience" || key === "membershipFee") user[key] = req.body[key] ? Number(req.body[key]) : undefined;
        else user[key] = req.body[key];
      }
    });

    // Update profile image
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
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  checkUsername,
  addUsers,
  getAllUsers,
  getById,
  updateUser,
  deleteUser,
  loginUser,
  changePassword,
};
