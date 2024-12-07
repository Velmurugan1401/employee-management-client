import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/Authpage';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated && !localStorage.getItem("token")) {
    return <Navigate to="/error" />;
  }
  return element;
};

export default PrivateRoute;
