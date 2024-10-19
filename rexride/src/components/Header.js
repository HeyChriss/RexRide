import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; // Adjust the path as needed

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-menu">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rides">Rides</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/report">Report</Link></li>
          <li><Link to="/account">Account</Link></li> 
        </ul>
      </nav>
      <div className="logo-container">
        <img src={logo} alt="Rideshare Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;