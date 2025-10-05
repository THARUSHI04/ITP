// src/Components/Store/Cart.js
import React, { useEffect } from "react";
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
    // Block empty carts
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // Enforce auth + role guard
    if (!hasValidUser) {
      alert("❌ You must log in to proceed with checkout.");
      navigate("/login", { state: { from: "/cart", message: "Login required to checkout" } });
      return;
    }
    // Success case
    navigate("/checkout");
  };

  // Redirect to showItems if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/showItems");
    }
  }, [cartItems.length, navigate]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div>
          <p>Redirecting to store...</p>
        </div>
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
