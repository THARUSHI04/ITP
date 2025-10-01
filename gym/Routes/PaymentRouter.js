// gym/Routes/PaymentRouter.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

// POST: create checkout session
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { planName, price } = req.body; // frontend sends these

    if (!planName || !price) {
      return res.status(400).json({ error: "Plan details missing" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planName,
            },
            unit_amount: price * 100, // convert dollars → cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/user-dashboard", // after payment
      cancel_url: "http://localhost:3000/subscriptions", // cancel page
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

module.exports = router;
