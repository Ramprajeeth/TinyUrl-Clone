import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap';
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
    <Container className='mt-4 px-3 px-md-5'>
      <h2 className='display-6 text-center p-4 mt-5 pt-5'>Login</h2>
      {err && <Alert className='mt-2 px-3 w-75 w-md-50 w-lg-50 mx-auto' variant='danger'>{err}</Alert>}

      <Form className='mt-2 px-3 w-75 w-md-50 w-lg-50 mx-auto' onSubmit={handleLogin}>
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
          <Button className='border-0' variant='success' type='submit'>Login</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default LoginPage