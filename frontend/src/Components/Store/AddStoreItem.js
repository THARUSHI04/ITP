import React, { useState } from "react";
import "./AddStoreItem.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/store";

function AddStoreItem() {
  const navigate = useNavigate();

  const [input, setInputs] = useState({
    name: "",
    brand: "",
    image_URL: "",
    catogary: "",
    price: "",
    stock:"",
    discription: "",
  });

  const [errors, setErrors] = useState({});

  //Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ""
      }));
    }
  };

  //Validation
  const validateForm = () => {
    const newErrors = {};

    if (!input.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!input.brand.trim()) {
      newErrors.brand = "Brand is required";
    }
    if (!input.catogary.trim()) {
      newErrors.catogary = "Category is required";
    }
    if (!input.price || input.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!input.stock || input.stock < 0) {
      newErrors.stock = "Stock must be 0 or greater";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    if (!validateForm()) {
      return;
    }
    
    try {
        await axios.post(URL, input);
        alert("Item added successfully!");
        navigate("/Admin-Dashboard" , {state: {tab:"store"}});
  } catch (err) {
        console.error(err);
        alert("Error adding item");
  }
  };

  return (
    <div className="add-store-container">
      <h1>Add Store Item</h1>

      <form onSubmit={handleSubmit} className="add-store-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span style={{color: 'red', fontSize: '12px'}}>{errors.name}</span>}

        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={input.brand}
          onChange={handleChange}
          required
        />
        {errors.brand && <span style={{color: 'red', fontSize: '12px'}}>{errors.brand}</span>}

        <label>Image URL</label>
        <input
          type="text"
          name="image_URL"
          value={input.image_URL}
          onChange={handleChange}
        />

        <label>Catogary</label>
        <input
          type="text"
          name="catogary"
          value={input.catogary}
          onChange={handleChange}
          required
        />
        {errors.catogary && <span style={{color: 'red', fontSize: '12px'}}>{errors.catogary}</span>}

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={input.price}
          onChange={handleChange}
          required
        />
        {errors.price && <span style={{color: 'red', fontSize: '12px'}}>{errors.price}</span>}

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={input.stock}
          onChange={handleChange}
          required
        />
        {errors.stock && <span style={{color: 'red', fontSize: '12px'}}>{errors.stock}</span>}

        <label>Description</label>
        <textarea
          name="discription"
          value={input.discription}
          onChange={handleChange}
          rows="4"
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AddStoreItem;