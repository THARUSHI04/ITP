import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ShowItems.css";

const URL = "http://localhost:5000/store";

function ShowItems() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { catname } = useParams();
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  // Category mapping to handle API vs URL differences
  const categoryMap = {
    supplements: "Supplements",
    accessories: "Lifting Accessories",
    shakers: "Shakers & Bottles",
    gifts: "Gift Collections",
    offers: "Offers & Deals",
  };

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(URL);
        console.log("API Response:", res.data); // Debug API data
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const normalizedCategory = Object.keys(categoryMap).find(
      (key) => categoryMap[key].toLowerCase() === p.category?.toLowerCase()
    );
    const matchCategory = catname
      ? normalizedCategory?.toLowerCase() === catname.toLowerCase()
      : true;
    console.log(
      `Product: ${p.name}, Category: ${p.category}, Normalized: ${normalizedCategory}, Matches: ${matchCategory}`
    ); // Debug filtering
    return matchSearch && matchCategory;
  });

  // Add to favorites
  const handleFavourite = (productId) => {
    console.log(`Added ${productId} to favourites`);
  };

  return (
    <div className="show-items-page">
      {/* Navbar */}
      <nav className="customer-navbar">
        <div className="logo">
          <Link to="/showItems">CorePlus</Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/category/supplements">Supplements</Link>
          </li>
          <li>
            <Link to="/category/accessories">Lifting Accessories</Link>
          </li>
          <li>
            <Link to="/category/shakers">Shakers & Bottles</Link>
          </li>
          <li>
            <Link to="/category/gifts">Gift Collections</Link>
          </li>
          <li>
            <Link to="/category/offers">Offers & Deals</Link>
          </li>
        </ul>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-icons">
          <Link to="/login">
            <FaUser size={22} title="Login" />
          </Link>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart size={22} title="Cart" />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <Link
                to={`/product/${product._id}`}
                state={{ product }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={product.image_URL}
                  alt={product.name}
                  className="product-img"
                />
                <h3>{product.name}</h3>
              </Link>

              <p className="brand">{product.brand}</p>
              <p className="price">LKR {product.price}</p>
              <p
                className={`stock ${
                  product.stock > 0 ? "in-stock" : "out-of-stock"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <div className="product-actions">
                <button
                  className="add-cart-btn"
                  disabled={product.stock <= 0}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <FaHeart
                  size={22}
                  className="fav-icon"
                  title="Add to Favourites"
                  onClick={() => handleFavourite(product._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No products found for category: {catname || "All"}</p>
        )}
      </div>
    </div>
  );
}

export default ShowItems;