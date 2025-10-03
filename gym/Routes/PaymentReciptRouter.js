const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/download-receipt/:paymentId", async (req, res) => {
  try {
    const { paymentId } = req.params;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt-${paymentIntent.id}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Gym Subscription Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Receipt ID: ${paymentIntent.id}`);
    doc.text(
      `Amount Paid: $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()}`
    );
    doc.text(`Payment Status: ${paymentIntent.status}`);
    doc.text(
      `Created: ${new Date(paymentIntent.created * 1000).toLocaleString()}`
    );
    doc.text(`Customer Email: ${paymentIntent.receipt_email || "N/A"}`);
    doc.moveDown();
    doc.text("✅ Thank you for your payment!", { align: "center" });

    doc.end();
  } catch (err) {
    console.error("Receipt generation error:", err);
    res.status(500).json({ error: "Could not generate receipt" });
  }
});

module.exports = router;

