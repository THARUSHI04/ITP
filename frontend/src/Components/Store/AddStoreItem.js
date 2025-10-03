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

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);

    // removed unused sendRequest helper
    
    try {
        await axios.post(URL, input);
        alert("Item added successfully!");
        navigate("/store");
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

        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={input.brand}
          onChange={handleChange}
          required
        />

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

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={input.price}
          onChange={handleChange}
          required
        />

        <label>Stock</label>
        <input
          type="number"
          name="stock"
          value={input.stock}
          onChange={handleChange}
          required
        />

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
