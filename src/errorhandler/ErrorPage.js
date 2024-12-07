import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="text-center" style={{ minHeight: '100vh' }}>
      <h1>Unauthorized Access</h1>
      <p>You must be logged in to view this page. Please log in to continue.</p>
      <Button variant="primary" onClick={handleGoHome}>Go to Login</Button>
    </Container>
  );
};

export default ErrorPage;
