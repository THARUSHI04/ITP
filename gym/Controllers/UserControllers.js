const mongoose = require("mongoose");
const User = require("../Model/UserModel");
const fs = require("fs");

// ==========================
// ✅ Get All Users
// ==========================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    const usersWithImages = users.map((u) => {
      const userObj = u.toObject();
      if (userObj.profileImage?.data) {
        userObj.profileImage = `data:${userObj.profileImage.contentType};base64,${userObj.profileImage.data.toString("base64")}`;
      }
      return userObj;
    });

    return res.status(200).json({ users: usersWithImages });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Server error while fetching users." });
  }
};

// ==========================
// ✅ Add New User
// ==========================
const addUsers = async (req, res) => {
  const {
    userName,
    email,
    password,
    contactNo,
    dob,
    gender,
    role,
    isApproved,
    // Gym-specific
    address,
    hours,
    membershipFee,
    facilities,
    description,
    // Instructor-specific
    expertise,
    experience,
    biography,
    sessionType,
    // Admin-specific
    joiningDate,
    notes,
  } = req.body;

  try {
    // Normalize username to lowercase and trim
    const normalizedUserName = userName.trim().toLowerCase();

    // Check if username already exists
    const existingUser = await User.findOne({ userName: normalizedUserName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists. Choose another." });
    }

    // Handle profile image
    let profileImageData;
    if (req.file) {
      profileImageData = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      };
      fs.unlinkSync(req.file.path);
    }

    const newUser = new User({
      userName: normalizedUserName,
      email: email?.trim(),
      password,
      contactNo: contactNo?.trim(),
      dob: dob ? new Date(dob) : undefined,
      gender,
      role: role?.toLowerCase(),
      isApproved,
      profileImage: profileImageData,
      // Gym fields
      address,
      hours: hours ? Number(hours) : undefined,
      membershipFee: membershipFee ? Number(membershipFee) : undefined,
      facilities,
      description,
      // Instructor fields
      expertise,
      experience: experience ? Number(experience) : undefined,
      biography,
      sessionType: sessionType || "Online",
      // Admin fields
      joiningDate: joiningDate ? new Date(joiningDate) : undefined,
      notes,
    });

    const savedUser = await newUser.save();

    const userToSend = savedUser.toObject();
    if (userToSend.profileImage?.data) {
      userToSend.profileImage = `data:${userToSend.profileImage.contentType};base64,${userToSend.profileImage.data.toString("base64")}`;
    }

    return res.status(201).json({ user: userToSend });
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ message: "Failed to add user.", error: err.message });
  }
};

// ==========================
// ✅ Get User by ID
// ==========================
const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const userToSend = user.toObject();
    if (userToSend.profileImage?.data) {
      userToSend.profileImage = `data:${userToSend.profileImage.contentType};base64,${userToSend.profileImage.data.toString("base64")}`;
    }

    return res.status(200).json({ user: userToSend });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ message: "Server error while fetching user." });
  }
};

// ==========================
// ✅ Update User
// ==========================
const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const updates = req.body;

    // Normalize username if updated
    if (updates.userName) {
      updates.userName = updates.userName.trim().toLowerCase();
      const existingUser = await User.findOne({ userName: updates.userName, _id: { $ne: id } });
      if (existingUser) return res.status(400).json({ message: "Username already exists." });
    }

    // Handle profile image
    if (req.file) {
      updates.profileImage = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      };
      fs.unlinkSync(req.file.path);
    }

    // Update all fields
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        if (["hours", "membershipFee", "experience"].includes(key)) {
          user[key] = Number(updates[key]);
        } else if (["dob", "joiningDate"].includes(key)) {
          user[key] = new Date(updates[key]);
        } else {
          user[key] = updates[key];
        }
      }
    });

    await user.save();

    const userToSend = user.toObject();
    if (userToSend.profileImage?.data) {
      userToSend.profileImage = `data:${userToSend.profileImage.contentType};base64,${userToSend.profileImage.data.toString("base64")}`;
    }

    return res.status(200).json({ user: userToSend });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Server error while updating user.", error: err.message });
  }
};

// ==========================
// ✅ Delete User
// ==========================
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ message: "Server error while deleting user." });
  }
};

// ==========================
// ✅ Login User
// ==========================
const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const normalizedUserName = userName.trim().toLowerCase();
    const user = await User.findOne({ userName: normalizedUserName });
    if (!user) return res.status(404).json({ message: "User not found. Please register." });

    if (user.password !== password) return res.status(401).json({ message: "Invalid password." });

    const userToSend = user.toObject();
    if (userToSend.profileImage?.data) {
      userToSend.profileImage = `data:${userToSend.profileImage.contentType};base64,${userToSend.profileImage.data.toString("base64")}`;
    }

    return res.status(200).json({ user: userToSend });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
};

// ==========================
// ✅ Get Current Logged-In User
// ==========================
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.query.userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: "Invalid user ID format" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const userToSend = user.toObject();
    if (userToSend.profileImage?.data) {
      userToSend.profileImage = `data:${userToSend.profileImage.contentType};base64,${userToSend.profileImage.data.toString("base64")}`;
    }

    return res.status(200).json({ user: userToSend });
  } catch (err) {
    console.error("Error fetching current user:", err);
    return res.status(500).json({ message: "Server error while fetching current user." });
  }
};

// ==========================
// ✅ Check Username Availability
// ==========================
const checkUsername = async (req, res) => {
  const userName = req.params.userName.trim().toLowerCase(); // normalize
  try {
    const existingUser = await User.findOne({ userName });
    return res.status(200).json({ exists: !!existingUser });
  } catch (err) {
    console.error("Error checking username:", err);
    return res.status(500).json({ message: "Failed to check username availability" });
  }
};

// ==========================
// ✅ Export Functions
// ==========================
module.exports = {
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
  loginUser,
  getCurrentUser,
  checkUsername,
};
