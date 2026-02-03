import React from 'react'

function ProductList({products}) {
  return (
    <div>
         <h2>Product List</h2>
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