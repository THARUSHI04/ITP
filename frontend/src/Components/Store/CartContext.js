// src/context/CartContext.js
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart (with quantity support)
  const addToCart = (product) => {
    if (!product || typeof product.stock !== "number" || product.stock <= 0) {
      // silently ignore or could surface a toast in UI layer
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        const nextQuantity = existing.quantity + 1;
        if (nextQuantity > product.stock) {
          return prev; // don't exceed stock
        }
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: nextQuantity } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Update quantity manually
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
