const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Order Items Schema (similar to Order_Items table)
const orderItemSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", // Products table -> Store model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true, // unit price at the time of order
    },
    subtotal: {
      type: Number,
      required: true, // quantity * price
    },
  },
  { _id: false } // no separate id for items
);

// Orders Schema
const orderSchema = new Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // buyer/customer
      required: true,
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    items: [orderItemSchema], // array of items
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
