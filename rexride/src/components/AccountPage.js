import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the authentication context

const AccountPage = () => {
  const { isLoggedIn, userEmail, logout } = useAuth(); // Get the authentication status, user email, and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Set isLoggedIn to false
    navigate('/'); // Redirect to the home page after logging out
  };

  return (
    <div className="account-page">
      {isLoggedIn ? (
        <>
          <h2>Welcome to Your Account</h2>
          <p>You are logged in as: <strong>{userEmail}</strong></p>
          <button
            onClick={handleLogout}
            className="account-logout-button"
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <p>Please log in to view your account details.</p>
          <button
            onClick={() => navigate('/login')}
            className="account-login-button"
          >
            Log In
          </button>
        </>
      )}
    </div>
  );
};

export default AccountPage;