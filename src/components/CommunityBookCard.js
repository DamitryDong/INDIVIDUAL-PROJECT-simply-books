'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useCart } from './cartContext';

function CommunityBookCard({ bookObj }) {
  const { addToCart } = useCart(); // This gets the addToCart function from the useCart hook to always get the right data
  const [message, setMessage] = useState(''); // This will be used for a temp message to tell user its been added to cart

  const handleAddToCart = () => {
    addToCart(bookObj); // Add the book to the cart
    setMessage('Book added to cart!'); // method for setting a message useState and then giving it a quick timer before setting message to empty again.
  };

  // I DID INLINE CSSING BECAUSE IT WAS JUST EASIER WITH 2 DIFFERENT BOOKCARDS, SHOULDA PLANNED BETTER...
  const cardStyle = {
    width: '18rem',
    margin: '10px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '18rem',
    overflow: 'visible',
  };

  const imageStyle = {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  };

  const bodyStyle = {
    padding: '15px',
    backgroundColor: '#fff',
  };

  const titleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  };

  const priceStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #343a40',
    fontWeight: 'bold',
    borderRadius: '5px',
    width: '100%',
    marginTop: '10px',
    color: 'black',
  };

  const messageStyle = {
    color: 'green',
    fontSize: '0.9rem',
    marginTop: '10px',
    textAlign: 'center',
  };

  const badgeStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: '#f5cb42',
    color: 'black',
    fontWeight: 'bold',
    width: '70px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '0.9rem',
    transform: 'translate(-25%, -25%)',
  };

  return (
    <div className="book-card" style={cardStyle}>
      {bookObj.sale && <div style={badgeStyle}>SALE</div>}
      <img className="book-card-image" src={bookObj.image} alt={bookObj.title} style={imageStyle} />
      <div className="book-card-body" style={bodyStyle}>
        <h3 className="book-card-title" style={titleStyle}>
          {bookObj.title}
        </h3>
        <div className="book-card-price" style={priceStyle}>
          {'Price: '}$<strong>{bookObj.price}</strong>
        </div>
        <Button
          variant="outline-dark"
          onClick={handleAddToCart}
          className="add-to-cart-button"
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'black';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.color = 'black';
          }}
        >
          Add to Cart
        </Button>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
}

CommunityBookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default CommunityBookCard;
