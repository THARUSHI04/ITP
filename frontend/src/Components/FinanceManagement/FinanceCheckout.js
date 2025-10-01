import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import "./FinanceCheckout.css";

// Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51SCm7DP0LlFDCJL92awL2KsWX0NYccyviVuj8QjoFzQXJ8B79yAdlXHtlSTwzxhVC5kbJy5srnESSdyY92PHTBBv00uWXrO8kS"
);

function CheckoutForm({ plan }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: plan.price * 100,
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ Payment Successful!");
        setPaymentSuccess(true);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("❌ Failed to process payment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = async () => {
    try {
      const params = new URLSearchParams({
        planName: plan.planName,
        price: plan.price,
        durationMonths: plan.durationMonths,
        email: "customer@example.com",
      });

      const response = await axios.get(`http://localhost:5000/download-receipt?${params.toString()}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "receipt.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Failed to download receipt:", err);
    }
  };

  const stripeElementOptions = {
    style: {
      base: {
        color: "#fff",
        fontSize: "16px",
        "::placeholder": { color: "#bbb" },
      },
      invalid: {
        color: "#ff4d4f",
      },
    },
  };

  return (
    <div>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number</label>
          <CardNumberElement options={stripeElementOptions} className="card-element" />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <CardExpiryElement options={stripeElementOptions} className="card-element" />
        </div>
        <div className="form-group">
          <label>CVC</label>
          <CardCvcElement options={stripeElementOptions} className="card-element" />
        </div>
        {error && <p className="checkout-error">{error}</p>}
        <button className="btn proceed-btn" type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {paymentSuccess && (
        <button className="btn download-btn" onClick={handleDownloadReceipt}>
          Download Receipt
        </button>
      )}
    </div>
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
        {plan.description?.split("\n").map((item, idx) => (
          <li key={idx}>✔ {item}</li>
        ))}
      </ul>
      <Elements stripe={stripePromise}>
        <CheckoutForm plan={plan} />
      </Elements>
    </div>
  );
}
