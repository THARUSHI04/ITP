// src/Components/Store/ShowItems.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useCart } from "./CartContext";
import "./ShowItems.css";

const URL = "http://localhost:5000/store";

function ShowItems() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]); // Track favorite items
  const { catname } = useParams(); // Get category from URL
  const { cartItems, addToCart } = useCart();

  //Map navbar URL param to API values.
  const categoryMap = {
    supplements: ["supplements", "supplement", "protein", "whey", "mass gainer"],
    accessories: ["accessories", "lifting accessories", "straps", "belts", "gloves"],
    shakers: ["shakers", "bottles", "shakers & bottles"],
    gifts: ["gifts", "gift collections", "bundles"],
    offers: ["offers", "offers & deals", "deal", "discount"],
  };

  //Fetch all products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(URL);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  //Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());

    let matchCategory = true;
    if (catname) {
      const candidates = categoryMap[catname.toLowerCase()] || [catname.toLowerCase()];
      const productCat = (p.catogary || p.category || "").toString().toLowerCase();
      matchCategory = candidates.some((c) => productCat.includes(c));
    }

    return matchSearch && matchCategory;
  });

  //Handle adding favorites (only for out-of-stock items)
  const handleFavourite = (productId, stock) => {
    if (stock > 0) {
      // In-stock items cannot be added to favorites
      return;
    }
    
    if (favorites.includes(productId)) {
      // Remove from favorites
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      // Add to favorites
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="show-items-page">
      {/* Navbar */}
      <nav className="customer-navbar">
        <div className="logo">
          <Link to="/showItems">CorePlus</Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/category/supplements">Supplements</Link></li>
          <li><Link to="/category/accessories">Lifting Accessories</Link></li>
          <li><Link to="/category/shakers">Shakers & Bottles</Link></li>
          <li><Link to="/category/gifts">Gift Collections</Link></li>
          <li><Link to="/category/offers">Offers & Deals</Link></li>
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
          <Link to="/login"><FaUser size={22} title="Login" /></Link>
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
                <img src={product.image_URL} alt={product.name} className="product-img" />
                <h3>{product.name}</h3>
              </Link>

              <p className="brand">{product.brand}</p>
              <p className="price">LKR {product.price}</p>
              <p className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              <div className="product-actions">
                <button
                  className="add-cart-btn"
                  /*disabled={product.stock <= 0}*/
                  onClick={() => {
                    if(product.stock <= 0) {
                      alert("Item is out of Stock.");
                    }else{
                      addToCart(product)};
                    }
                  }  
                >
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <FaHeart
                  size={22}
                  className={`fav-icon ${
                    product.stock > 0 ? "fav-disabled" : ""
                  } ${
                    favorites.includes(product._id) ? "fav-active" : ""
                  }`}
                  title={
                    product.stock > 0
                      ? "Only out-of-stock items can be added to favorites"
                      : favorites.includes(product._id)
                      ? "Remove from Favourites"
                      : "Add to Favourites"
                  }
                  onClick={() => handleFavourite(product._id, product.stock)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">
            No products found for category: {catname || "All"}
          </p>
        )}
      </div>
    </div>
  );
}

export default ShowItems;
