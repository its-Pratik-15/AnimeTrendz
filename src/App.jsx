import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Footer from './components/Footer';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })
  const [selectedCartItems, setSelectedCartItems] = useState(new Set())
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

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    const updatedCart = [...cartItems, product]
    setCartItems(updatedCart)
    localStorage.setItem('cartItems', JSON.stringify(updatedCart))
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
      <div className="app">
        <Navbar 
          cartItems={cartItems}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
          <Route 
            path="/products/:id" 
            element={
              <ProductDetails 
                products={products} 
                addToCart={addToCart} 
                cartItems={cartItems}
                setSelectedItems={setSelectedCartItems}
              />
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                items={cartItems} 
                setCartItems={setCartItems}
                selectedItems={selectedCartItems}
                setSelectedItems={setSelectedCartItems}
              />
            } 
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
