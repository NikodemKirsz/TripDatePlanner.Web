import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
  //const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <header id="navbar">
      <div className="side">
        <Link to="/">
          <div className="logo">
            <span>Trip Date Planner</span>
          </div>
        </Link>
      </div>
      <div className="side">
        <ul className="links">
          <li className="link">
            <Link to="/trip/0">Trip</Link>
          </li>
          <li className="link">
            <Link to="/newtrip">Plan Trip</Link>
          </li>
          <li className="link">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Navbar;