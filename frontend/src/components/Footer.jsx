import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Section À propos */}
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="footer-icon">🔨</span>
              Trouve Ton Artisan
            </h3>
            <p className="footer-description">
              Votre annuaire de référence pour trouver les meilleurs artisans 
              de la région Auvergne-Rhône-Alpes. Qualité, savoir-faire et 
              proximité garantis.
            </p>
          </div>

          {/* Section Navigation */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/artisans">Nos Artisans</Link></li>
              <li><Link to="/artisans?top=true">Artisans du mois</Link></li>
            </ul>
          </div>

          {/* Section Catégories */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Catégories</h4>
            <ul className="footer-links">
              <li><Link to="/artisans?category=1">Bâtiment</Link></li>
              <li><Link to="/artisans?category=2">Services</Link></li>
              <li><Link to="/artisans?category=3">Fabrication</Link></li>
              <li><Link to="/artisans?category=4">Alimentation</Link></li>
            </ul>
          </div>

          {/* Section Suivez-nous */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Suivez-nous</h4>
            <div className="footer-social">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Trouve Ton Artisan. Tous droits réservés.
          </p>
          <p className="footer-credits">
            Conçu avec ❤️ en Auvergne-Rhône-Alpes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;