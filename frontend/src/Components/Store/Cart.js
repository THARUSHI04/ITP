import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart. <Link to="/ShowItems">Go shopping</Link></p>
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
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                />
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>
            Total: LKR{" "}
            {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </h3>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
