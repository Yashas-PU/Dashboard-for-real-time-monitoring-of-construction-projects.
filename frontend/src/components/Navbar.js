import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Construction Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <FaUserCircle size={20} className="me-2" /> Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  <FaUserCircle className="me-2" /> Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  <FaCog className="me-2" /> Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/logout" className="text-danger">
                  <FaSignOutAlt className="me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;