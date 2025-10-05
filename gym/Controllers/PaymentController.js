const Payment = require("../Model/PaymentModel");

// ✅ Get all payments (for admin)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "userName email") // populate user info
      .populate("planId", "planName price"); // populate plan info

    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

module.exports = {
  getAllPayments,
};
