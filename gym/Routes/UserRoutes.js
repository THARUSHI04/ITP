const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const UserController = require("../Controllers/UserControllers");

// ==========================
// Multer Setup for Profile Images
// ==========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// ==========================
// USER ROUTES
// ==========================

// ✅ 1. Check username availability — MUST be before dynamic /:id route
router.get("/check-username/:userName", UserController.checkUsername);

// ✅ 2. Registration
router.post("/", upload.single("profileImage"), UserController.addUsers);

// ✅ 3. Get all users
router.get("/", UserController.getAllUsers);

// ✅ 4. Dynamic routes (must come after specific routes)
router.get("/:id", UserController.getById);
router.put("/:id", upload.single("profileImage"), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

// ✅ 5. Login
router.post("/login", UserController.loginUser);

module.exports = router;
