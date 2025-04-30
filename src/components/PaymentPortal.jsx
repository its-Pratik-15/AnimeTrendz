import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentPortal.css';

const PaymentPortal = ({ total, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically integrate with a payment gateway
    // For demo purposes, we'll just simulate a successful payment
    setTimeout(() => {
      onPaymentComplete();
      navigate('/order-confirmation');
    }, 1500);
  };

  return (
    <div className="payment-portal">
      <h2>Payment Details</h2>
      <div className="payment-amount">
        <h3>Total Amount: ${total}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            maxLength="19"
            required
          />
        </div>

        <div className="form-group">
          <label>Card Holder Name</label>
          <input
            type="text"
            name="cardHolder"
            placeholder="John Doe"
            value={paymentDetails.cardHolder}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              maxLength="5"
              required
            />
          </div>
          <div className="form-group half">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              placeholder="123"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              maxLength="3"
              required
            />
          </div>
        </div>

        <button type="submit" className="payment-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPortal;