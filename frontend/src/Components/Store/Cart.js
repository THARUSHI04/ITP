// src/Components/Store/Cart.js
import React from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
// Fallback auth from localStorage role if AuthContext is unavailable
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  // Derive userId and role from localStorage saved by Login
  const storedUserId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const storedRole = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  // Handle checkout
  const handleCheckout = () => {
    if (!storedUserId) {
      alert("You must log in to proceed with checkout.");
      navigate("/login");
      return;
    }
    if (storedRole && storedRole.toLowerCase() !== "user") {
      alert("Only customer accounts can purchase from the store.");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          No items in cart. <Link to="/showItems">Go shopping</Link>
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
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
