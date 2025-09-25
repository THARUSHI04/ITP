const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Setup multer for profile image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Controllers
const UserController = require("../Controllers/UserControllers");

// Routes
router.post("/", upload.single("profileImage"), UserController.addUsers);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getById);
router.put("/:id", upload.single("profileImage"), UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
router.post("/login", UserController.loginUser);

// Export router
module.exports = router;
