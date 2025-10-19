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

// ✅ Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51SCm7DP0LlFDCJL92awL2KsWX0NYccyviVuj8QjoFzQXJ8B79yAdlXHtlSTwzxhVC5kbJy5srnESSdyY92PHTBBv00uWXrO8kS"
);



function CheckoutForm({ plan }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // ✅ States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  // ✅ Payment handler
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Create payment intent
      const { data } = await axios.post("http://localhost:5000/payment/create-payment-intent", {
        amount: plan.price * 100,
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment
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
        setPaymentId(result.paymentIntent.id);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("❌ Failed to process payment.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Receipt download function (no redirect, triggers save directly)
  const handleDownloadReceipt = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/receipt/download-receipt/${paymentId}`,
        { responseType: "blob" } // important to get file as Blob
      );

      // Create a link element and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Receipt download error:", err);
      alert("❌ Could not download receipt.");
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
        {/* ========== Payment Section ========== */}
        <h3 className="section-title">Payment Details</h3>
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

      {/* ✅ Show receipt + back buttons after success */}
      {paymentSuccess && paymentId && (
        <div style={{ marginTop: "20px" }}>
          <button className="btn proceed-btn" onClick={handleDownloadReceipt}>
            Download Receipt
          </button>

          <button
            className="btn back-btn"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate("/user-dashboard")}
          >
            Back
          </button>
        </div>
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
