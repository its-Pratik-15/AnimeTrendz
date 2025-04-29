import { Link } from 'react-router-dom'
import logo from '../image/logo.jpg'
import '../styles/Navbar.css'

function Navbar({ cartItems, isMenuOpen, toggleMenu }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">
          <img src={logo} alt="AnimeTrendz Logo" className="nav-logo" />
          <span>AnimeTrendz</span>
        </Link>
      </div>
      <button className="hamburger" onClick={toggleMenu}>☰</button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar