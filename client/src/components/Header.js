import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header({currentPage, handlePageChange}){
    return(
        <Navbar bg="dark" variant="dark" expand="lg">
      <Container className='d-flex'>
        <Navbar.Brand className="navbar-brand d-flex align-items-center text-light" href="#home">Inkling</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end text-light'>

          <Nav
            className='navbar navbar-dark navbar-expand-md bg-dark py-3 '
          >
            <Nav.Item>
              <Nav.Link href="#Signup" onClick={() => handlePageChange('Sign-Up')}>Sign Up</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#Profile" onClick={() => handlePageChange('Profile')}>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href ="#Feed" onClick={() => handlePageChange('Feed')}>Feed</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};
export default Header