import {Container, Navbar, Nav} from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

export default function NavbarComp() {
  return (
    <Navbar bg='dark' data-bs-theme="dark">
        <Navbar.Brand as={Link} to="/">React xd</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Főoldal</Nav.Link>
            <Nav.Link as={Link} to="/products">Termékek</Nav.Link>
            <Nav.Link as={Link} to ="/register">Regisztráció</Nav.Link>
            <Nav.Link as={Link} to ="/login">Bejelentkezés</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}