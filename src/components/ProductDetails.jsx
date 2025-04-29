import { useParams } from 'react-router-dom'
import { useState } from 'react' 
import '../styles/ProductDetails.css'

function ProductDetails({ products, addToCart }) {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const [selectedSize, setSelectedSize] = useState('')

  if (!product) {
    return <div className="product-not-found">Product not found</div>
  }

  const handleBuyNow = () => {
    addToCart(product)
    window.location.href = '/cart'
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart({ ...product, selectedSize })
  }

  return (
    <div className="product-details-container">
      <div className="product-details-grid">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="anime-name">From {product.anime}</p>
          <div className="price-section">
            <span className="price">${product.price}</span>
            <span className="stock-status">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          
          <div className="description-section">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          {product.sizes && (
            <div className="size-section">
              <h2>Available Sizes</h2>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.inStock || (product.sizes && !selectedSize)}
            >
              Add to Cart
            </button>
            <button 
              className="buy-now-btn"
              onClick={handleBuyNow}
              disabled={!product.inStock || (product.sizes && !selectedSize)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails