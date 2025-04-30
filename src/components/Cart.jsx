import React, { useState } from 'react';
import PaymentPortal from './PaymentPortal';
import '../styles/Cart.css'
import { Link } from 'react-router-dom';

function Cart({ items, setCartItems, selectedItems, setSelectedItems }) {
  const [showPayment, setShowPayment] = useState(false)

  // Remove the local selectedItems state since it's now passed as a prop
  // const [selectedItems, setSelectedItems] = useState(new Set())

  const toggleItemSelection = (index) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(index)) {
      newSelected.delete(index)
    } else {
      newSelected.add(index)
    }
    setSelectedItems(newSelected)
  }

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index)
    setCartItems(newItems)
    // Remove from selected items if it was selected
    const newSelected = new Set(selectedItems)
    newSelected.delete(index)
    setSelectedItems(newSelected)
  }

  const calculateTotal = () => {
    return items
      .filter((_, index) => selectedItems.has(index))
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2)
  }

  const handleCheckout = () => {
    const checkoutItems = items.filter((_, index) => selectedItems.has(index))
    if (checkoutItems.length > 0) {
      setShowPayment(true)
    }
  }

  const handlePaymentComplete = () => {
    // Remove purchased items from cart
    const newItems = items.filter((_, index) => !selectedItems.has(index))
    setCartItems(newItems)
    setSelectedItems(new Set())
    setShowPayment(false)
  }

  if (showPayment) {
    return (
      <PaymentPortal 
        total={calculateTotal()} 
        onPaymentComplete={handlePaymentComplete}
      />
    )
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="empty-cart">
          <i className="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
          <Link to="/products" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                <input
                  type="checkbox"
                  checked={selectedItems.has(index)}
                  onChange={() => toggleItemSelection(index)}
                  className="item-checkbox"
                />
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-anime">{item.anime}</p>
                  {item.selectedSize && (
                    <p className="item-size">Size: {item.selectedSize}</p>
                  )}
                  <p className="item-price">${item.price}</p>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeItem(index)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Selected Items:</span>
              <span>{selectedItems.size}</span>
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
              disabled={selectedItems.size === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart