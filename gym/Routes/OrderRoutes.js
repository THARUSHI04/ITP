const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../Controllers/OrderControllers");

const router = express.Router();

router.post("/", createOrder);          // Create order
router.get("/", getAllOrders);          // Get all orders
router.get("/:id", getOrderById);       // Get order by ID
router.put("/:id", updateOrderStatus);  // Update order status
router.delete("/:id", deleteOrder);     // Delete order

module.exports = router;
