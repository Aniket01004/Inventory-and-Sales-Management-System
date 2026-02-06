import { useState } from 'react'
import './App.css'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Login from './components/Login';

function App() {
  const [reload, setReload] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const refreshProducts = () => {
    setReload(!reload);
  }

  if(!loggedIn){
    return <Login onLogin={() => setLoggedIn(true)} />;
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
