// src/components/auth/GoogleLoginButton.jsx
import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button className="google-login-button" onClick={handleLogin}>
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
