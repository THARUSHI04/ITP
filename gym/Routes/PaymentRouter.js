const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


// ✅ Correct Payment model path (make sure folder name is 'Model' not 'Models')
const Payment = require("../Model/Payment");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// -----------------------------
// Create PaymentIntent & Save to MongoDB
// -----------------------------
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, userName } = req.body; // amount in cents

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // ✅ Save payment details to MongoDB
    const payment = new Payment({
      stripePaymentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      userName: userName || "Anonymous",
    });

    await payment.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

// -----------------------------
// Fetch all payments (MongoDB)
// -----------------------------
router.get("/all", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("DB Fetch error:", err);
    res.status(500).json({ error: "Could not fetch payments" });
  }
});

// -----------------------------
// Generate Receipt PDF
// -----------------------------
router.get("/receipt/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;

    // Fetch payment details from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    // Create a PDF document
    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../Receipts/receipt-${paymentId}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text("Payment Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Payment ID: ${paymentIntent.id}`);
    doc.text(`Amount: $${(paymentIntent.amount / 100).toFixed(2)}`);
    doc.text(`Status: ${paymentIntent.status}`);
    doc.text(`Currency: ${paymentIntent.currency.toUpperCase()}`);
    doc.text(`Created: ${new Date(paymentIntent.created * 1000).toLocaleString()}`);
    doc.end();

    // Send PDF file for download
    doc.on("finish", () => {
      res.download(filePath, `receipt-${paymentId}.pdf`, (err) => {
        if (err) {
          console.error("Download error:", err);
          res.status(500).send("Could not download receipt.");
        }
      });
    });
  } catch (err) {
    console.error("Receipt generation error:", err);
    res.status(500).json({ error: "Could not generate receipt" });
  }
});

module.exports = router;
