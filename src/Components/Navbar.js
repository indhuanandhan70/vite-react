import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">YouCan</Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/coding-practice" className="navbar-link">Coding Practice</Link>
          <Link to="/videos" className="navbar-link">Videos</Link>
          <Link to="/student-dashboard" className="navbar-link">Student Dashboard</Link>
          <Link to="/discussion" className="navbar-link">Discussion</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/login-signup" className="navbar-link">Start Your Career</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
