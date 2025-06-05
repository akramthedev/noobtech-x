import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./index.css";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Update isScrolled based on window scroll position
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  // Update isMobile based on window width (you can adjust the breakpoint as needed)
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <div className={`Navbar ${isScrolled ? ' NavbarShadow' : ''}`}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo">
          <span>
            Noob<span>Tech</span>
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="NavContainer">
        <a href="#why">
          <button>Fonctionnalités</button>
        </a>
        <a href="#tarif">
          <button>Tarification</button>
        </a>
        <a href="#security">
          <button>Sécurité</button>
        </a>
        <a href="#screens">
          <button>Showcase</button>
        </a>
      </div>

      {/* “Se connecter” / “Créer un compte” buttons (only shown when not mobile) */}
      {!isMobile && (
        <div className="butContainer">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button>Se connecter</button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button>Créer un compte</button>
          </Link>
        </div>
      )}

      {/* Mobile “hamburger” button */}
      {isMobile && (
        <button onClick={toggleNavbar} className="ellipsis">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu-icon lucide-menu"
          >
            <path d="M4 12h16" />
            <path d="M4 18h16" />
            <path d="M4 6h16" />
          </svg>
        </button>
      )}

      {/* Sidebar (mobile only) */}
      <nav className={`sidebar${isNavbarOpen ? ' open' : ''}`}>
        {/* Close button inside sidebar */}
        {isMobile && (
          <button onClick={toggleNavbar} className="ellipsis2">
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}

        <ul>
          <li>
            <a href="#why" onClick={toggleNavbar}>
              Fonctionnalités et Services
            </a>
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li>
            <a href="#tarif" onClick={toggleNavbar}>
              Tarification et Plans
            </a>
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li>
            <a href="#security" onClick={toggleNavbar}>
              Sécurité et Confidentialité
            </a>
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li>
            <a href="#screens" onClick={toggleNavbar}>
              Un aperçu concret
            </a>
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li>
            <a href="#faq" onClick={toggleNavbar}>
              Questions fréquentes
            </a>
            <i className="fa-solid fa-chevron-right"></i>
          </li>
        </ul>

        <div className="rowBtn1">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="seConnecter">
              Connectez-vous à votre compte
            </button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button className="register">
              Créer un nouveau compte
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
