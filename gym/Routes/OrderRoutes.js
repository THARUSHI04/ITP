const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  payOrder,
  createCheckoutSession,
  approveBankDeposit,
} = require("../Controllers/OrderControllers");

const router = express.Router();

// Multer setup for bank slip uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.single("bank_slip"), createOrder);          // Create order with optional bank slip
router.get("/", getAllOrders);          // Get all orders
router.get("/:id", getOrderById);       // Get order by ID
router.put("/:id", updateOrderStatus);  // Update order status
router.delete("/:id", deleteOrder);     // Delete order
router.post("/:id/pay", payOrder);      // Mark paid, decrement stock, send email
router.post("/:id/checkout-session", createCheckoutSession); // Stripe session
router.post("/:id/approve-deposit", approveBankDeposit); // Admin approves bank deposit

module.exports = router;
