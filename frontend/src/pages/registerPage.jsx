import React from 'react'
import { Container, Form, Button, Alert,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axiosconfig.js'
import ToastNotify from '../components/toastNotify';

const RegisterPage = () => {
  const [showToast,setShowToast]=useState(false);
  const [toastMsg,setToastMsg]=useState('');
  const [user, setUser]=useState('');
  const [password, setPassword]=useState('');
  const [err,setErr]=useState('')
  //setSuccessMsg('')

  const handleRegister=async(e)=>{
     e.preventDefault();
    try{
      const response=await api.post('/auth/signup',{username:user,password})
      if(response.status==201 || response.status==200){
      setToastMsg('Registration successful');
      setShowToast(true)}

    }
    catch(err){
      console.error('Registration error:', err);
      setErr('User already exists')
    }

    
  }

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card className="p-4 p-md-5 shadow-lg rounded-4 bg-white" style={{ width: '100%', maxWidth: '420px' }}>
        <h2 className="text-center mb-4 fw-bold text-success">Create an Account</h2>
        {err && (
          <Alert className="text-center" variant="danger">
            {err}
          </Alert>
        )}

        <Form onSubmit={handleRegister}>
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
              Register
            </Button>
          </div>
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-info text-decoration-none">
              Login here
            </Link>
          </small>
        </div>

        <ToastNotify show={showToast} setShow={setShowToast} msg={toastMsg} />
      </Card>
    </Container>
  );
}

export default RegisterPage