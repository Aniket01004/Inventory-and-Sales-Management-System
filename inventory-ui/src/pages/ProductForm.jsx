import React, { useState } from 'react'
import api from '../api/axios';

function ProductForm({onProductAdded}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image); // this must be state

    await api.post("/products/with-image", formData);

    alert("Product added successfully");

  } catch (error) {
    console.error("Error adding product", error);
  }
};

  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        />


        <input 
        placeholder='Product Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <input 
        placeholder='Price' 
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />

        <input 
        placeholder='Quantity' 
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        />

        <button type='submit' onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default ProductForm