import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the authentication context

const AccountPage = () => {
  const { isLoggedIn, userEmail, logout } = useAuth(); // Get the authentication status, user email, and logout function
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data if logged in
    if (isLoggedIn && userEmail) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/users/email/${userEmail}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data); // Update the state with the fetched user data
            setError(null); // Clear any previous errors
          } else {
            const errorData = await response.json();
            setError(errorData.error || 'Failed to fetch user data');
          }
        } catch (error) {
          setError('An error occurred while fetching user data');
          console.error('An error occurred:', error);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, userEmail]);

  const handleLogout = () => {
    logout(); // Set isLoggedIn to false
    navigate('/'); // Redirect to the home page after logging out
  };

  return (
    <div className="account-page">
      {isLoggedIn ? (
        userData ? (
          <>
            <h2>Welcome to Your Account</h2>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone Number:</strong> {userData.phone_number}</p>
            <button
              onClick={handleLogout}
              className="account-logout-button"
            >
              Log Out
            </button>
          </>
        ) : (
          error ? (
            <>
              <h2>Error</h2>
              <p>{error}</p>
            </>
          ) : (
            <p>Loading account information...</p>
          )
        )
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
