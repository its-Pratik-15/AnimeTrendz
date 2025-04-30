import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3><Link to="/" style={{ color: '#FF4B2B', textDecoration: 'none' }}>AnimeTrendz</Link></h3>
          <p>Created by Pratik</p>
        </div>
        <div className="footer-contact">
          <p>Contact:</p>
          <a href="mailto:panpratik15@gmail.com">panpratik15@gmail.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;