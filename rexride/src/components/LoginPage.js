import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the authentication context
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages
  const { login } = useAuth(); // Get the login function from the AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the login request to the server
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, update the AuthContext and navigate to the home page
        login(email);
        navigate('/');
      } else {
        // Handle different error messages returned from the server
        setErrorMessage(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      // Handle network or server errors
      setErrorMessage('An error occurred while trying to log in. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log In</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if present */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="create-account-link">
          <a href="#create-account" onClick={() => navigate('/multistep-toggle')}>Create Account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;