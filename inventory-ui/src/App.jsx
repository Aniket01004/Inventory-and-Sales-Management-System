import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Inventory Management System</h1>
        <ProductForm />
        <ProductList />
      </div>
    </>
  )
}

export default App
