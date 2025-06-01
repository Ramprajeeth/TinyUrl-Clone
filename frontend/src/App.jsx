import { use, useEffect, useState } from 'react'
import ShortenPage from './pages/shortenPage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import Dashboard from './pages/dashboard'
import Header from './components/header'
import './App.css'
import { Route,Routes,BrowserRouter as Router, Navigate } from 'react-router-dom'


function App(){
  const [loggedIn,setLoggedIn]=useState(false);
  
  return (
    <>
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    
      <Routes>
        <Route path='/shorten' element={loggedIn?<ShortenPage/>:<Navigate to='/login'/>}/>
        <Route path='/login' element={!loggedIn?<LoginPage setLoggedIn={setLoggedIn}/>:<Navigate to='/'/>}/>
        <Route path='/register' element={!loggedIn?<RegisterPage/>:<Navigate to='/'/>}/>
        <Route path='/' element={loggedIn?<Dashboard/>:<Navigate to='/login'/>}/>
      </Routes>
    </>
  )
}

export default App
