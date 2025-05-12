import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          Mini CRM
        </NavLink>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <NavLink to="/home" activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/campaign" activeClassName="active">
                Campaign
              </NavLink>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;