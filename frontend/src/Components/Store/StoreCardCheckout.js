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
import { useCart } from "./CartContext";
import "./StoreCardCheckout.css";

//Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51SCm7DP0LlFDCJL92awL2KsWX0NYccyviVuj8QjoFzQXJ8B79yAdlXHtlSTwzxhVC5kbJy5srnESSdyY92PHTBBv00uWXrO8kS"
);

function CardCheckoutForm({ orderData }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //Create payment intent
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
        amount: orderData.totalAmount * 100, // Convert to cents
      });

      const clientSecret = data.clientSecret;

      //Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        //Update order with failed payment status
        await axios.put(`http://localhost:5000/orders/${orderData.orderId}/payment-status`, {
          payment_status: "failed",
        });
      } else if (result.paymentIntent.status === "succeeded") {
        //Get card details
        const paymentMethod = await stripe.retrievePaymentMethod(result.paymentIntent.payment_method);
        
        //Update order with successful payment and card details
        await axios.put(`http://localhost:5000/orders/${orderData.orderId}/payment-status`, {
          payment_status: "success",
          card_details: {
            card_last4: paymentMethod.card.last4,
            card_brand: paymentMethod.card.brand,
            payment_intent_id: result.paymentIntent.id,
          },
        });

        //Mark order as paid
        await axios.post(`http://localhost:5000/orders/${orderData.orderId}/pay`);

        alert("✅ Payment Successful! Your order has been placed.");
        setPaymentSuccess(true);
        clearCart();
        
        //Redirect to store after 2 seconds
        setTimeout(() => {
          navigate("/showItems");
        }, 2000);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("❌ Failed to process payment.");
    } finally {
      setLoading(false);
    }
  };

  const stripeElementOptions = {
    style: {
      base: {
        color: "#ffffff",
        fontSize: "16px",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": { 
          color: "#999999" 
        },
        iconColor: "#e50914",
      },
      invalid: {
        color: "#ff4d4f",
        iconColor: "#ff4d4f",
      },
      complete: {
        color: "#00b894",
        iconColor: "#00b894",
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
          {loading ? "Processing..." : `Pay LKR ${orderData.totalAmount}`}
        </button>
      </form>

      {paymentSuccess && (
        <div className="success-message">
          <p>✅ Payment successful! Redirecting to store...</p>
        </div>
      )}
    </div>
  );
}

export default function StoreCardCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="checkout-container">
        <h2>No order data found</h2>
        <button className="btn back-btn" onClick={() => navigate("/store-checkout")}>
          Back to Checkout
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Complete Your Payment</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Order Number:</strong> {orderData.orderNumber}</p>
        <p><strong>Shipping Address:</strong> {orderData.address}</p>
        <p><strong>Contact Phone:</strong> {orderData.phone}</p>
        <p className="checkout-price"><strong>Total Amount: LKR {orderData.totalAmount}</strong></p>
      </div>
      <Elements stripe={stripePromise}>
        <CardCheckoutForm orderData={orderData} />
      </Elements>
    </div>
  );
}
