import React, { useState } from 'react'
import { Container, Form, Button, Alert,Card } from 'react-bootstrap';
import api from '../api/axiosconfig.js'

const LoginPage = ({setLoggedIn}) => {
  const [user,setUser]=useState('');
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')

  const handleLogin=async(e)=>{
    e.preventDefault();
    try{
      const response=await api.post('/auth/login',{username:user,password:password})
      localStorage.setItem('username', user);
      setLoggedIn(true)
    }
    catch(err){
      console.log(err)
      setErr('Invalid credentials. Try again')

    }
  }
 return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card className="p-4 p-md-5 shadow-lg rounded-4 bg-white" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 className="text-center mb-4 fw-bold text-info">Welcome Back!</h2>
        {err && (
          <Alert className="text-center" variant="danger">
            {err}
          </Alert>
        )}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Username</Form.Label>
            <Form.Control
              className="form-control-lg"
              type="text"
              placeholder="Enter username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              className="form-control-lg"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button variant="success" size="lg" type="submit" className="shadow-sm">
              Login
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">Don't have an account? <a href="/register" className="text-info text-decoration-none">Register</a></small>
        </div>
      </Card>
    </Container>
  );
}

export default LoginPage