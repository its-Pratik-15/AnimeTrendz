import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="hero" style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/assets/bg.webp)`
    }}>
      <h1>Welcome to AnimeTrendz</h1>
      <p>Your One-Stop Shop for Anime Merchandise</p>
      <Link to="/products" className="cta-button">Shop Now</Link>
    </div>
  )
}

export default Home