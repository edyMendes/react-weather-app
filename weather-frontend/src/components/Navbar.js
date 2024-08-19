// src/components/Navbar.js
import React from "react";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Weather Dashboard</h2>
      </div>
      <div className="navbar-links">
        <button className="navbar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
