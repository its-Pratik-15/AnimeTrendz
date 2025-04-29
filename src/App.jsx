import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Contact from './components/Contact'
import Cart from './components/Cart'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => {
        const productsWithPublicPaths = data.products.map(product => ({
          ...product,
          image: product.image.replace('/src/assets/', '/image/')
        }))
        setProducts(productsWithPublicPaths)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }, [])

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
    console.log(`Added ${product.name} to cart`)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <Navbar 
        cartItems={cartItems}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart items={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  )
}

export default App
