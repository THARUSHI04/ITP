const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  stripePaymentId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "usd" },
  status: { type: String, required: true },
  userName: { type: String },
}, { timestamps: true }); // ✅ adds createdAt & updatedAt

module.exports = mongoose.model("Payment", paymentSchema);
