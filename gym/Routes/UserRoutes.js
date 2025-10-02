const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const UserController = require("../Controllers/UserControllers");

// Multer setup for profile image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ==========================
// USER ROUTES
// ==========================

// Check username availability
router.get("/check-username/:userName", UserController.checkUsername);

// Registration
router.post("/", upload.single("profileImage"), UserController.addUsers);

// Get all users
router.get("/", UserController.getAllUsers);

// Dynamic user routes
router.get("/:id", UserController.getById);
router.put("/:id", upload.single("profileImage"), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// Login
router.post("/login", UserController.loginUser);

module.exports = router;
