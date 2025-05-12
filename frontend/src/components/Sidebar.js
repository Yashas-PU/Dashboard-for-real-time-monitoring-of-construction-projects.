import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaUser, FaTools, FaSignOutAlt, FaTasks, FaBell, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-light" style={{ width: '250px', height: '100vh' }}>
      <div className="bg-primary text-white text-center py-4">
        <h2>Dashboard Features</h2>
      </div>
      <Nav className="flex-column p-3">
        <Nav.Item>
          <Nav.Link as={Link} to="/">
            <FaHome className="me-2" /> Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/projects">
            <FaProjectDiagram className="me-2" /> Projects
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/tasks">
            <FaTasks className="me-2" /> Tasks
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/resources">
            <FaTools className="me-2" /> Resources
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/users">
            <FaUser className="me-2" /> Users
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link as={Link} to="/reports">
            <FaChartBar className="me-2" /> Reports
          </Nav.Link>
        </Nav.Item> */}
        {/* <Nav.Item>
          <Nav.Link as={Link} to="/notifications">
            <FaBell className="me-2" /> Notifications
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item className="mt-auto">
          <Nav.Link as={Link} to="/logout" className="text-danger">
            <FaSignOutAlt className="me-2" /> Logout
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
