import React, { useState } from 'react'

function ProductForm({onAddProduct}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
      quantity
    }

    onAddProduct(product);

    setName("");
    setPrice("");
    setQuantity("");
  }
  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
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