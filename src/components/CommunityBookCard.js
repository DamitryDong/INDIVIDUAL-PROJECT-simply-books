'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useCart } from './cartContext';

function CommunityBookCard({ bookObj }) {
  const { addToCart } = useCart(); // This gets the addToCart function from the the useCart hook to always get the write data

  const handleAddToCart = () => {
    addToCart(bookObj); // Add the book to the cart
    console.log('Added to cart', bookObj);
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{bookObj.title} COMM</Card.Title>
        <p className="card-text bold">
          {bookObj.sale && (
            <span>
              SALE
              <br />
            </span>
          )}
          {'Price: '}$<strong>{bookObj.price}</strong>
        </p>
        <Button variant="outline-dark" onClick={handleAddToCart} className="m-2">
          Add Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

CommunityBookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default CommunityBookCard;
