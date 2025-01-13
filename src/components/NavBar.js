/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useCart } from './cartContext';

export default function NavBar() {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.length;
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
              <img src="/free-opened-book-icon-3163-thumb.png" alt="Books" style={{ width: '20px', marginRight: '5px' }} />
              Books
            </Link>
            <Link className="nav-link" href="/authors">
              <img src="/Pencil-icon.png" alt="Authors" style={{ width: '20px', marginRight: '5px' }} />
              Authors
            </Link>
            <Link className="nav-link" href="/profile">
              <img src="/6522516.png" alt="Authors" style={{ width: '20px', marginRight: '5px' }} />
              Profile
            </Link>
          </Nav>
          {/* Links on the right with some added spacing for the button just because it makes sense */}
          <Nav className="ms-auto">
            <Link className="nav-link" href="/communityBooks">
              <img src="/shopping-bag-icon-1800x2048-srvkec2m.png" alt="Authors" style={{ width: '16px', marginRight: '4px' }} />
              Book Shop
            </Link>
            <Link className="nav-link" href="/checkoutPage">
              <img src="/Shopping_Cart_Icon_PNG_Clipart.png" alt="Authors" style={{ width: '20px', marginRight: '5px' }} />
              Cart
              <Badge bg="dark" style={{ marginLeft: '5px' }}>
                {cartItemCount}
              </Badge>
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
