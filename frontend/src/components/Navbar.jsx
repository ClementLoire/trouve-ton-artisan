import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🔨</span>
          <span className="logo-text">Trouve Ton Artisan</span>
        </Link>

        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Accueil
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink 
              to="/artisans" 
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Nos Artisans
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink 
              to="/artisans?top=true" 
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Artisans du mois
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;