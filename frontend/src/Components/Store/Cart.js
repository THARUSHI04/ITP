// src/Components/Store/Cart.js
import React from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Get saved login details
  const storedUserId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const storedRole =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const hasValidUser =
    !!storedUserId &&
    storedUserId !== "null" &&
    storedUserId !== "undefined" &&
    String(storedUserId).trim() !== "";

  const normalizedRole = String(storedRole || "").trim().toLowerCase();
  const canCheckout = hasValidUser && normalizedRole === "user";

  // Checkout handler
  const handleCheckout = () => {
    if (!hasValidUser) {
      alert("❌ You must log in to proceed with checkout.");
      navigate("/login");
      return;
    }
    if (normalizedRole !== "user") {
      alert("❌ Only customer accounts can purchase from the store.");
      navigate("/login");
      return;
    }
    // Success case
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          No items in cart. Go shopping from the store page.
        </p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image_URL} alt={item.name} width="80" />
              <div>
                <h4>{item.name}</h4>
                <p>LKR {item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                />
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}

          <h3>
            Total: LKR{" "}
            {cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </h3>

          {/* Checkout Button */}
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={!canCheckout}
            title={!canCheckout ? "Login as customer to proceed" : undefined}
          >
            Proceed to Checkout
          </button>
          {!canCheckout && (
            <p style={{ marginTop: "8px" }}>
              Please <Link to="/login">log in</Link> with a customer account to continue.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
