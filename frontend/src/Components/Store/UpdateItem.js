import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateItem.css";

function UpdateItem() {
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch item data on mount
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/store/${id}`);
        setInput(res.data.store);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };
    fetchHandler();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/store/${id}`, input);
      alert("Item updated successfully!");
      navigate("/store");
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Error updating item");
    }
  };

  return (
    <div className="update-store-container">
      <h1>Update Store Item</h1>

      <form onSubmit={handleSubmit} className="update-store-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={input.name || ""}
          onChange={handleChange}
          required
        />

        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={input.brand || ""}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image_URL"
          value={input.image_URL || ""}
          onChange={handleChange}
        />

        <label>Catogary</label>
        <input
          type="text"
          name="catogary"
          value={input.catogary || ""}
          onChange={handleChange}
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={input.price || ""}
          onChange={handleChange}
          required
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={input.stock || ""}
          onChange={handleChange}
          required
        />


        <label>Description</label>
        <textarea
          name="discription"
          value={input.discription || ""}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit">Update Item Details</button>
      </form>
    </div>
  );
}

export default UpdateItem;
