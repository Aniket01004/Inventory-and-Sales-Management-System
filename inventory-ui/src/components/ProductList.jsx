import React, { useEffect, useState } from 'react'
import api from '../api/axios';

function ProductList() {
  const[products,setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/products")
    .then((response) => {
      setProducts(response.data);
    })
    .catch(() => {
      setError("Failed to load products");
    });
  
  }, [])
  


  return (
    <div>
         <h2>Product List</h2>
         {error && <p style={{color: "red"}}>{error}</p>}
        {products.length === 0 ? (
          <p>No products available</p>
        ):(
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
          </table>
        )
        }
    </div>
   
  );
}

export default ProductList