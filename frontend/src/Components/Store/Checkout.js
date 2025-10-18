// src/Components/Store/Checkout.js
import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  //Auth context from localStorage
  const storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const storedRole = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const hasValidUser = !!storedUserId && storedUserId !== "null" && storedUserId !== "undefined" && String(storedUserId).trim() !== "";
  const normalizedRole = String(storedRole || "").trim().toLowerCase();

  //Block route access on mount if not a logged-in customer
  useEffect(() => {
    if (!hasValidUser) {
      alert("❌ You must log in to access checkout.");
      navigate("/login");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidUser]);
  const [form, setForm] = useState({
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });
  const [bankSlip, setBankSlip] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      //Allow only digits, max 14
      const digits = (value || "").replace(/\D/g, "").slice(0, 14);
      setForm({ ...form, phone: digits });
      if (digits.length === 0) {
        setErrors((prev) => ({ ...prev, phone: "Phone is required" }));
      } else if (!/^\d{1,14}$/.test(digits)) {
        setErrors((prev) => ({ ...prev, phone: "Only digits, up to 14" }));
      } else {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
      return;
    }
    if (name === "address") {
      const next = value;
      setForm({ ...form, address: next });
      return;
    }
    if (name === "paymentMethod") {
      setForm({ ...form, paymentMethod: value });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const nextErrors = {};
    if (!/^\d{1,14}$/.test(String(form.phone || "").trim())) {
      nextErrors.phone = "Phone must be digits only and <= 14 digits";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasValidUser) {
      alert("❌ You must log in to place an order.");
      navigate("/login");
      return;
    }
    if (normalizedRole !== "user") {
      alert("❌ Only customer accounts can place orders.");
      navigate("/login");
      return;
    }

    //Frontend validations aligned with backend
    const valid = validateForm();
    if (!valid) return;

    //Generate random order number
    const orderNumber = "ORD-" + Date.now();

    const userId = storedUserId;

    try {
      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
      //Transform items to match backend schema { product, quantity }
      const items = cartItems.map((ci) => ({ product: ci._id, quantity: ci.quantity }));

      let createRes;
      if (form.paymentMethod === "Bank Deposit") {
        const fd = new FormData();
        fd.append("order_number", orderNumber);
        fd.append("member", userId);
        fd.append("items", JSON.stringify(items));
        fd.append("shipping_address", form.address);
        fd.append("contact_phone", form.phone);
        fd.append("payment_method", form.paymentMethod);
        if (bankSlip) fd.append("bank_slip", bankSlip);
        createRes = await axios.post("http://localhost:5000/orders", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        createRes = await axios.post("http://localhost:5000/orders", {
          order_number: orderNumber,
          member: userId,
          items,
          shipping_address: form.address,
          contact_phone: form.phone,
          payment_method: form.paymentMethod,
        });
      }
      const orderId = createRes?.data?._id || createRes?.data?.order?._id || createRes?.data?.id;
      if (orderId) {
        //If card payment selected, redirect to card checkout page
        if (form.paymentMethod === "Card Payment") {
          const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
          navigate("/store-card-checkout", {
            state: {
              orderData: {
                orderId: orderId,
                orderNumber: orderNumber,
                address: form.address,
                phone: form.phone,
                totalAmount: totalAmount,
              }
            }
          });
          return;
        }
        if (form.paymentMethod !== "Bank Deposit") {
          //Confirm order (mark paid), reduce stock, and email customer
          try {
            await axios.post(`http://localhost:5000/orders/${orderId}/pay`);
            alert(`Order confirmed! Your Order ID: ${orderNumber}`);
            clearCart();
            navigate("/showItems");
            return;
          } catch (e) {
            console.error("Pay step failed; proceeding with placed status", e);
            alert(`Order placed! Your Order ID: ${orderNumber}`);
            clearCart();
            navigate("/showItems");
            return;
          }
        } else {
          alert(`Order placed (Bank Deposit). Your Order ID: ${orderNumber}. Awaiting admin approval.`);
          clearCart();
          navigate("/showItems");
          return;
        }
      }
      alert(`Order placed successfully! Your Order ID: ${orderNumber}`);
      clearCart();
      navigate("/showItems");
    } catch (err) {
      console.error("Order failed", err);
      const data = err?.response?.data || {};
      const details = Array.isArray(data.errors) ? `\n- ${data.errors.join("\n- ")}` : "";
      const msg = data.error || data.message || err?.message || "Unknown error";
      alert(`Order failed: ${msg}${details}`);
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
        {/* address validation removed per request */}

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && (
          <div style={{ color: "red", marginTop: 4 }}>{errors.phone}</div>
        )}

        <label>Payment Method</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option>Cash on Delivery</option>
          <option>Card Payment</option>
          <option>Bank Deposit</option>
        </select>
        {/* payment method validation removed per request */}

        {form.paymentMethod === "Bank Deposit" && (
          <>
            <label>Upload Bank Slip (optional)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setBankSlip(e.target.files?.[0] || null)}
            />
            {/* bank slip validation removed per request */}
          </>
        )}

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
