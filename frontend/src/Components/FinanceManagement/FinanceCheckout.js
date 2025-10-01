import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./FinanceCheckout.css";

// Use your Stripe publishable key
const stripePromise = loadStripe("pk_test_51SCm7DP0LlFDCJL92awL2KsWX0NYccyviVuj8QjoFzQXJ8B79yAdlXHtlSTwzxhVC5kbJy5srnESSdyY92PHTBBv00uWXrO8kS");

function CheckoutForm({ plan }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Ask backend to create PaymentIntent
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: plan.price * 100 // convert dollars to cents
      });

      const clientSecret = data.clientSecret;

      // 2️⃣ Confirm card payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment Successful!");
        navigate("/subscriptions");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("❌ Failed to process payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="payment-form" onSubmit={handlePayment}>
      <div className="form-group">
        <label>Card Details</label>
        <CardElement className="card-element" />
      </div>
      {error && <p className="checkout-error">{error}</p>}
      <button className="btn proceed-btn" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function FinanceCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  if (!plan) {
    return (
      <div className="checkout-container">
        <h2>No plan selected</h2>
        <button className="btn back-btn" onClick={() => navigate("/subscriptions")}>
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout: {plan.planName}</h2>
      <p className="checkout-price">Price: ${plan.price}</p>
      <p className="checkout-duration">
        Duration: {plan.durationMonths} month{plan.durationMonths > 1 ? "s" : ""}
      </p>
      <ul className="checkout-features">
        {plan.description?.split("\n").map((item, idx) => <li key={idx}>✔ {item}</li>)}
      </ul>
      <Elements stripe={stripePromise}>
        <CheckoutForm plan={plan} />
      </Elements>
    </div>
  );
}
