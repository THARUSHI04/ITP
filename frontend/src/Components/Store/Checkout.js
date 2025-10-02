// src/Components/Store/Checkout.js
import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"

function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate random order number
    const orderNumber = "ORD-" + Date.now();

    const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (!userId) {
      alert("Please login to place an order.");
      return;
    }
    if (role && role.toLowerCase() !== "user") {
      alert("Only customer accounts can place orders.");
      return;
    }

    try {
      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      // Transform items to match backend schema { product, quantity }
      const items = cartItems.map((ci) => ({ product: ci._id, quantity: ci.quantity }));

      const createRes = await axios.post("http://localhost:5000/orders", {
        order_number: orderNumber,
        member: userId,
        items,
        shipping_address: form.address,
        contact_phone: form.phone,
        payment_method: form.paymentMethod,
      });
      const orderId = createRes.data?._id;
      if (orderId) {
        // If card payment selected, try Stripe; otherwise immediately confirm and reduce inventory
        if (form.paymentMethod === "Card Payment") {
          try {
            const sess = await axios.post(`http://localhost:5000/orders/${orderId}/checkout-session`);
            if (sess.data?.url) {
              window.location.href = sess.data.url;
              return;
            }
          } catch (e) {
            // ignore and fallthrough to pay
          }
        }
        // Confirm order (mark paid), reduce stock, and email customer
        try {
          await axios.post(`http://localhost:5000/orders/${orderId}/pay`);
          alert(`Order confirmed! Your Order ID: ${orderNumber}`);
          navigate("/showItems");
          return;
        } catch (e) {
          console.error(e);
        }
      }
      alert(`Order placed successfully! Your Order ID: ${orderNumber}`);
      navigate("/showItems");
    } catch (err) {
      console.error("Order failed", err);
      const msg = err?.response?.data?.error || err?.response?.data?.message || err?.message || "Unknown error";
      alert(`Order failed: ${msg}`);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label>Shipping Address</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          <option>Card Payment</option>
        </select>

        <h3>
          Total: LKR{" "}
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </h3>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
