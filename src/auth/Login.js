import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AuthApi from '../service/authApi';
import { useAuth } from './Authpage';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth(); 
    const navigate = useNavigate();

    if (isAuthenticated) {
        navigate('/dashboard');
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in both fields.');
            return;
        }
        await AuthApi.login({ username, password }).then((res) => {
            const token = res.data.token;
            login(token);
            navigate('/dashboard');
        }).catch((err) => {
            console.err(err)
            setError("Something is wrong employee can't able to login")
        })
        setError('');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-4">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
