import React, { useState, useEffect } from 'react';
import "./index.css";
import {useLocation, useNavigate} from "react-router-dom"


const NavbarTv = ({isFullscreen, toggleFullscreenOnClick}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [currentRoute, setcurrentRoute] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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


  const logout = async ()=>{
    try{
      localStorage.removeItem('token');
      localStorage.removeItem('establishmentId');
      localStorage.removeItem('user');
      navigate(0);
    }
    catch(e){
      console.log(e.message);
    }
  }


  useEffect(() => {
    console.log(location);
    if (location.pathname === "/dashboard/tv" || location.pathname === "/dashboard/tv/") {
      setcurrentRoute("TV");
    } else if (location.pathname === "/dashboard/services" || location.pathname === "/dashboard/services/") {
      setcurrentRoute("Services");
    }
    else if (location.pathname === "/dashboard/bureaux" || location.pathname === "/dashboard/bureaux/") {
      setcurrentRoute("Bureaux");
    }
    else if (location.pathname === "/dashboard/tickets" || location.pathname === "/dashboard/tickets/") {
      setcurrentRoute("Tickets");
    }
    else if (location.pathname === "/dashboard/gestion-tickets" || location.pathname === "/dashboard/gestion-tickets/") {
      setcurrentRoute("Gestion Tickets");
    }
    else if (location.pathname === "/dashboard/statistiques" || location.pathname === "/dashboard/statistiques/") {
      setcurrentRoute("Statistiques");
    }
    else if (location.pathname === "/dashboard/reglages" || location.pathname === "/dashboard/reglages/") {
      setcurrentRoute("Réglages");
    }
  }, [location.pathname]);


  return (
    <div className={`Navbartvtvt  ${isFullscreen ? 'hideNavbar' : ''}`}>
        <div className="logo">
          <span>
            Dashboard {currentRoute && <span>/ {currentRoute}</span> }
          </span>
        </div>

      <div className="NavContainer2">
        <a  href="/dashboard/tv">
          <button 
            style={{ 
            color : currentRoute === "TV" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "TV" ? "600" : "400"
            }}   
          >TV</button>
        </a>
        <a href="/dashboard/tickets">
          <button 
            style={{ 
            color : currentRoute === "Tickets" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "Tickets" ? "600" : "400"
            }}   
          >Tickets</button>
        </a>
        <a href="/dashboard/gestion-tickets">
          <button 
            style={{ 
            color : currentRoute === "Gestion Tickets" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "Gestion Tickets" ? "600" : "400"
            }}   
          >Gestion Tickets</button>
        </a>
         <a href="/dashboard/statistiques">
          <button 
            style={{ 
            color : currentRoute === "Statistiques" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "Statistiques" ? "600" : "400"
            }}   
          >Statistiques</button>
        </a>
        {/* <a href="/dashboard/services" >
          <button 
            style={{ 
            color : currentRoute === "Services" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "Services" ? "600" : "400"
            }}   
          >Services</button>
        </a>
        <a href="/dashboard/bureaux" >
          <button 
            style={{ 
            color : currentRoute === "Bureaux" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "Bureaux" ? "600" : "400"
            }}   
          >Bureaux</button>
        </a> */}
        <a href="/dashboard/compte">
          <button 
            style={{ 
            color : currentRoute === "Réglages" ? "#1a75c0" : "#303030",  
            fontWeight : currentRoute === "Réglages" ? "600" : "400"
            }}   
          >Réglages</button>
        </a>
      </div>

      {!isMobile && (
        <div className="butContainer">
             
            <button onClick={toggleFullscreenOnClick} className='fullScreen' >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a75c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-expand-icon lucide-expand"><path d="m15 15 6 6"/><path d="m15 9 6-6"/><path d="M21 16v5h-5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="m3 21 6-6"/><path d="M3 8V3h5"/><path d="M9 9 3 3"/></svg>
            </button>
            <button onClick={logout} className='enterFullScreen' >
              Se déconnecter
            </button>
        </div>
      )}

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

      <nav className={`sidebar${isNavbarOpen ? ' open' : ''}`}>
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
        </ul>

        <div className="rowBtn1">
            <button className="register"  >
              Entrer en plein écran
            </button>
        </div>
      </nav>
    </div>
  );
};

export default NavbarTv;
