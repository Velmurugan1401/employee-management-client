import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    localStorage.setItem('token', token);  // Store the token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');  // Remove the token
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
 
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
