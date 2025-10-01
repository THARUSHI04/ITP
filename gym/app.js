require('dotenv').config(); // Load env variables
const PDFDocument = require("pdfkit");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Stripe = require("stripe"); // Stripe SDK

// Stripe instance with secret key from .env
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  credentials: true,
}));

// Routes
const UserRoutes = require("./Routes/UserRoutes");
const FinanceRouter = require("./Routes/FinanceRouter");
const ScheduleRoute = require("./Routes/ScheduleRoute");
const UserScheduleCreationRoute = require("./Routes/UserScheduleCreationRoute");

app.use("/users", UserRoutes);
app.use("/finance", FinanceRouter);
app.use("/schedules", ScheduleRoute);
app.use("/user-schedule-creations", UserScheduleCreationRoute);

// -----------------------------
// Stripe Payment Route
// -----------------------------
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // amount in cents, e.g., $10 = 1000

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -----------------------------
// ✅ Updated Download Receipt Route
// -----------------------------
app.get("/download-receipt", (req, res) => {
  // Get plan and user info from query params
  const { planName, price, durationMonths, email } = req.query;

  const doc = new PDFDocument();
  res.setHeader("Content-disposition", "attachment; filename=receipt.pdf");
  res.setHeader("Content-type", "application/pdf");

  doc.fontSize(20).text("🎉 Payment Receipt", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Customer Email: ${email || "N/A"}`);
  doc.text(`Plan Name: ${planName || "N/A"}`);
  doc.text(`Price Paid: $${price || "0.00"}`);
  doc.text(`Duration: ${durationMonths || "0"} month${durationMonths > 1 ? "s" : ""}`);
  doc.text(`Date: ${new Date().toLocaleString()}`);

  doc.end();
  doc.pipe(res);
});

// -----------------------------
// MongoDB Connection
// -----------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
