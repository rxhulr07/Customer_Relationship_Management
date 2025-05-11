import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          Mini CRM
        </NavLink>
        <div className="navbar-links">
            <NavLink to="/home" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/login" activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/register" activeClassName="active">
            Register
          </NavLink>
          {/* Placeholder for future authenticated routes */}
          {/* <NavLink to="/home" activeClassName="active">Home</NavLink> */}
          {/* <NavLink to="/campaign" activeClassName="active">Campaign</NavLink> */}
          {/* <button onClick={() => console.log('Logout')}>Logout</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;