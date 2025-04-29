import { Link } from 'react-router-dom'
import '../styles/Products.css'

function Products({ products, addToCart }) {
  return (
    <div className="products-container">
      <h1>Our Collection</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {!product.inStock && <span className="out-of-stock">Out of Stock</span>}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-anime">{product.anime}</p>
              <p className="product-price">${product.price}</p>
              {product.sizes && (
                <div className="size-options">
                  {product.sizes.map(size => (
                    <span key={size} className="size-badge">{size}</span>
                  ))}
                </div>
              )}
              <div className="product-actions">
                <Link to={`/products/${product.id}`} className="view-details">View Details</Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="add-to-cart"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products