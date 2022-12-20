import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Auth from '../../utils/auth';

function Header({ currentPage, handlePageChange }) {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className='d-flex'>
        <Navbar.Brand className="navbar-brand d-flex align-items-center text-light" href="/">Inkling</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end text-light'>

          <Nav
            className='navbar navbar-dark navbar-expand-md bg-dark py-3 '
          >
            {Auth.loggedIn() ? (
              // link to profile and logout
              <>
                <Nav.Item>
                  <Nav.Link href="Profile" onClick={() => handlePageChange('Profile')}>Profile</Nav.Link>
                </Nav.Item>
                <Navbar.Text>
                  <a href="/" className="text-decoration-none text-white-50" onClick={logout}>Logout</a>
                </Navbar.Text>
              </>
            ) : (
              // link to login
              <Nav.Item>
                <Nav.Link href="Login" onClick={() => handlePageChange('Login')}>Login</Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link href="/" onClick={() => handlePageChange('Feed')}>Feed</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header