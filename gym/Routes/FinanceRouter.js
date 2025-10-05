  const express = require("express");
const router = express.Router();
const FinanceController = require("../Controllers/FinanceController");



// Routes
router.get("/", FinanceController.getAllPlans);
router.post("/", FinanceController.addPlan);
router.get("/:id", FinanceController.getPlanById);
router.put("/:id", FinanceController.updatePlan);
router.delete("/:id", FinanceController.deletePlan);




module.exports = router;
