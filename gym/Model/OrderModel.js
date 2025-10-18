const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Order Items
const orderItemSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store", 
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true, 
    },
  },
  { _id: false }
);

//Orders Schema
const orderSchema = new Schema(
  {
    order_number: {
      type: String,
      required: true,
      //Auto-generate 
      default: function () {
        return `ORD-${Date.now()}`;
      },
      unique: true,
      index: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
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
      default: "Cash on Delivery",
    },
    bank_slip: {
      type: String, // file path to uploaded bank slip (if any)
    },
    card_details: {
      card_last4: {
        type: String, // last 4 digits of card
      },
      card_brand: {
        type: String, // e.g., "visa", "mastercard"
      },
      payment_intent_id: {
        type: String, // Stripe payment intent ID
      },
    },
    payment_status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    items: [orderItemSchema], // array of items
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
