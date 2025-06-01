import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import { Navbar,Nav ,NavLink} from 'react-bootstrap'


const Header = ({loggedIn,setLoggedIn}) => {

    const navigate=useNavigate();
    const handleLogout=()=>{
        setLoggedIn(false);
        navigate('/login');
    }
  return (
    <div>
        <Navbar bg='dark' fixed='top' variant='dark' className='shadow-sm top-0 start-0 w-100'  expand='lg'>
            <Container fluid className='px-3'>
                <Navbar.Brand as={Link} to='/' className='fw-bold fs-3 text-warning' style={{ fontFamily: '"Pacifico", cursive' }}>TinyUrl</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto text-lg-end'>
            {
                loggedIn &&(
                    <>
                    <Nav.Link as={Link} to='/' className='mx-2 text-warning'>Dashboard</Nav.Link>
                    <Nav.Link as={Link} to='/shorten' className='mx-2 text-warning'>Shorten URL</Nav.Link>
                    <Button onClick={handleLogout} variant='outline-warning' className='ms-2 w-auto d-inline-block rounded-pill'>Logout</Button>
                    </>
                )
            }
            {
                !loggedIn &&(
                    <>
                    <Nav.Link as={Link} to='/login' className='mx-2 text-warning'>Login</Nav.Link>
                    <Nav.Link as={Link} to='/register' className='mx-2 text-warning'>Register</Nav.Link>
                    </>
                )
            }
            </Nav></Navbar.Collapse></Container>
        </Navbar>

    </div>
  )
}

export default Header