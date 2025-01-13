/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          Simply B
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Links on the left */}
          <Nav className="me-auto">
            <Link className="nav-link" href="/">
              Books
            </Link>
            <Link className="nav-link" href="/authors">
              Authors
            </Link>
            <Link className="nav-link" href="/profile">
              Profile
            </Link>
          </Nav>
          {/* Links on the right with some added spacing for the button just because it makes sense */}
          <Nav className="ms-auto">
            <Link className="nav-link" href="/communityBooks">
              Book Shop WIP
            </Link>
            <Link className="nav-link" href="/">
              🛒 Cart
            </Link>
            <Button variant="outline-dark" onClick={signOut} style={{ marginLeft: '40px' }}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
