const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const StorePayment = require("../Model/StorePayment"); // new model
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create PaymentIntent for Store Orders
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, userName, orderId } = req.body; // amount in cents

    if (!amount || !orderId) return res.status(400).json({ error: "Amount and orderId required" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    const payment = new StorePayment({
      stripePaymentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      userName: userName || "Anonymous",
      orderId,
    });

    await payment.save();
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

module.exports = router;
