import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateItem.css";

function UpdateItem() {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  //Fetch item data on mount
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/store/${id}`);
        setInput(res.data?.store ?? res.data ?? {});
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };
    fetchHandler();
  }, [id]);

  //Handle input change
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    //Clear error message
    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  //Validations
  const validateForm = () => {
    const newErrors = {};

    if (!input.name || !input.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!input.brand || !input.brand.trim()) {
      newErrors.brand = "Brand is required";
    }
    if (!input.catogary || !input.catogary.trim()) {
      newErrors.catogary = "Category is required";
    }
    if (!input.price || input.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (input.stock === "" || input.stock < 0) {
      newErrors.stock = "Stock must be 0 or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5000/store/${id}`, input);
      alert("Item updated successfully!");
      navigate("/Admin-Dashboard", { state: { tab: "store" } });
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
          value={input?.name ?? ""}
          required
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={input?.brand ?? ""}
          required
          onChange={handleChange}
        />
        {errors.brand && <span className="error">{errors.brand}</span>}

        <label>Image URL</label>
        <input
          type="text"
          name="image_URL"
          value={input?.image_URL ?? ""}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          type="text"
          name="catogary"
          value={input?.catogary ?? ""}
          required
          onChange={handleChange}
        />
        {errors.catogary && <span className="error">{errors.catogary}</span>}

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={input?.price ?? ""}
          min="0.01"
          step="0.01"
          required
          onChange={handleChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={input?.stock ?? ""}
          min="0"
          step="1"
          required
          onChange={handleChange}
        />
        {errors.stock && <span className="error">{errors.stock}</span>}

        <label>Description</label>
        <textarea
          name="discription"
          value={input?.discription ?? ""}
          required
          onChange={handleChange}
          rows="4"
        />

        <button type="submit">Update Item Details</button>
      </form>
    </div>
  );
}

export default UpdateItem;
