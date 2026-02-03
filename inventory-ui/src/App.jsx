import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products,product]);
  }

  return (
    <>
      <div>
        <h1>Inventory Management System</h1>
        <ProductForm onAddProduct={addProduct}/>
        <ProductList products={products}/>
      </div>
    </>
  )
}

export default App
