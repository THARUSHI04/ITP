import React from "react";
import { useLocation, Link } from "react-router-dom";
import './ProductDetails.css';

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {}; // get product from state

  if (!product) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Product not found!
      </p>
    );
  }

  return (
    <div className="product-details-page">
      <Link to="/ShowItems" className="back-link">← Back to products</Link>

      <div className="product-details-card">
        <img src={product.image_URL} alt={product.name} className="product-img" />

        <h2 className="product-name">{product.name || "No Name"}</h2>
        <p className="product-brand">Brand: {product.brand || "N/A"}</p>
        <p className="product-price">Price: LKR {product.price || "0"}</p>
        <p className="product-description">{product.discription}</p>

        <Link to="/cart">
          <button className="add-cart-btn">Add to Cart</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
