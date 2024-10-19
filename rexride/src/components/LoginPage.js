import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the authentication context
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get the login function from the AuthContext
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate authentication (replace with actual authentication logic)
    if (email === 'test@example.com' && password === 'password') {
      login(email); // Update the authentication status with the email
      navigate('/'); // Redirect to the home page after successful login
    } else {
      alert('Invalid email or password'); // Show an error message
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Log In</h2>
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