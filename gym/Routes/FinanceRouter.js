const express = require("express");
const router = express.Router();


// Insert Model
const Finance = require("../Model/FinanceModel")
// Import Finance Controller
const FinanceController = require("../Controllers/FinanceController");

// GET all users
router.get("/", FinanceController.getAllUsers);
router.post("/", FinanceController.addSubscriptionPlans);
router.get("/:id", FinanceController.getById);
router.put("/:id", FinanceController.updateUser);
router.delete("/:id", FinanceController.deleteUser);

module.exports = router;
