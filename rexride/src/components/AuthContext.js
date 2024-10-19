import React, { createContext, useState, useContext } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null); // New state for user name

  // Function to log in the user
  const login = (email, name) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserName(name); // Set the user's name
  };

  // Function to log out the user
  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};