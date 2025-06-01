import React from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
      <Container className='mt-4 px-3 px-md-5'>
        <h2 className='display-6 text-center p-4 mt-5 pt-5'>Register</h2>
  {err && <Alert className='mt-2 px-3 w-75 w-md-50 w-lg-50 mx-auto' variant='danger'>{err}</Alert>}
        <Form className='mt-2 px-3 w-75 w-md-50 w-lg-50 mx-auto' onSubmit={handleRegister}>
          <Form.Group className='mb-4'>
            <Form.Label className='fw-bold'>Username</Form.Label>
            <Form.Control className='form-control-lg shadow-sm'
              type="text"
              placeholder="Enter username"
              value={user}
              onChange={(e)=>setUser(e.target.value)}
              required
            />
          </Form.Group>
            <Form.Label className='fw-bold'>Password</Form.Label>
            <Form.Control className='form-control-lg shadow-sm'
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
  
          <Form.Group className='text-center p-4'>
            <Button className='border-0' variant='success' type='submit'>Register</Button>
          </Form.Group>
        </Form>
        <p className="mt-3 text-center text-success">
        Already have an account?
        <Link to="/login" className='text-decoration-none'>Login here</Link>
      </p>
      <ToastNotify show={showToast} setShow={setShowToast} msg={toastMsg}/>
      </Container>
    )
}

export default RegisterPage