import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'

function App() {
  const [reload, setReload] = useState(false);

  const refreshProducts = () => {
    setReload(!reload);
  }

  return (
    <>
      <div>
        <h1>Inventory Management System</h1>
        <ProductForm onProductAdded={refreshProducts}/>
        <ProductList key={reload}/>
      </div>
    </>
  )
}

export default App
