const User = require("../Model/UserModel");

// ✅ Get All Users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Server error while fetching users." });
  }
};

// ✅ Add New User
const addUsers = async (req, res, next) => {
  const {
    userName,
    email,
    password,
    contactNo,
    dob,
    gender,
    role,
    isApproved,
  } = req.body;

  try {
    const newUser = new User({
      userName,
      email,
      password,
      contactNo,
      dob,
      gender,
      role,
      isApproved,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({ user: savedUser });
  } catch (err) {
    console.error("Error adding user:", err);
    return res.status(500).json({ message: "Failed to add user.", error: err.message });
  }
};

// ✅ Get User by ID
const getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ message: "Server error while fetching user." });
  }
};

// ✅ Update User
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    userName,
    email,
    password,
    contactNo,
    dob,
    gender,
    role,
    joinedDate,
    isApproved,
    profileImage,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        userName,
        email,
        password,
        contactNo,
        dob,
        gender,
        role,
        joinedDate,
        isApproved,
        profileImage,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Unable to update user. User not found." });
    }

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ message: "Server error while updating user.", error: err.message });
  }
};

// ✅ Delete User
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Unable to delete user. User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully.", user: deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({ message: "Server error while deleting user." });
  }
};

// ✅ Login User by userName + password
const loginUser = async (req, res, next) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please register." });
    }

    // Plaintext password check (replace with bcrypt in real apps)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Optionally, check if user is approved
    if (user.role !== "admin" && user.isApproved === false) {
      return res.status(403).json({ message: "Your account is not approved yet." });
    }

    // Successful login
    return res.status(200).json(user);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
};


// ✅ Export functions
module.exports = {
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
  loginUser,
};
