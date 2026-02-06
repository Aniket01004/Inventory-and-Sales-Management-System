import React, { useState } from 'react'
import api from '../api/axios';

function ProductForm({onProductAdded}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload = {
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
    };
    console.log("Sending payload:",payload);
    
    try{
      await api.post("/products",payload);
      onProductAdded();
    }catch(err){
      console.error("API error:", err.response || err.message);
      setError("Failed to add product");
    }
    
  }
  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

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

        <button type='submit'>Add</button>
    </form>
  );
}

export default ProductForm