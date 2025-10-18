const mongoose = require("mongoose");

const storePaymentSchema = new mongoose.Schema({
  stripePaymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  status: { type: String, required: true },
  userName: { type: String },
  orderId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("StorePayment", storePaymentSchema);
