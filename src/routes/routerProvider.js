import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Auth Handler
import { AuthProvider } from '../auth/Authpage';


// Error handlers
import ErrorPage from '../errorhandler/ErrorPage';
import PageNotFound from '../errorhandler/ErrorNotFound';

import PrivateRoute from './authRoute'; 
// Pages
import LoginForm from '../auth/Login';
import Dashboard from "../pages/Dashboard";


function RouterProvider() {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default RouterProvider;
