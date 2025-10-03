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
    order_number: {
      type: String,
      required: true,
      // Auto-generate if not provided by client
      default: function () {
        return `ORD-${Date.now()}`;
      },
      unique: true,
      index: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // buyer/customer (matches actual model name)
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
    shipping_address: {
      type: String,
    },
    contact_phone: {
      type: String,
    },
    payment_method: {
      type: String,
      enum: ["Cash on Delivery", "Card Payment"],
      default: "Cash on Delivery",
    },
    items: [orderItemSchema], // array of items
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
