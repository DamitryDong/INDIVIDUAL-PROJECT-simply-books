'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteBook } from '../api/bookData';

function BookCard({ bookObj, onUpdate }) {
  const deleteThisBook = () => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="book-card">
      <img className="book-image" src={bookObj.image} alt={bookObj.title} />
      <div className="overlay">
        <h2 className="book-title">{bookObj.title}</h2>
        <p className="book-description">
          <strong>Description:</strong> {bookObj.description}
        </p>
        <div className="button-container">
          <Link href={`/book/${bookObj.firebaseKey}`} passHref>
            <Button variant="dark" className="bookmark-button view">
              VIEW
            </Button>
          </Link>
          <Link href={`/book/edit/${bookObj.firebaseKey}`} passHref>
            <Button variant="dark" className="bookmark-button edit">
              EDIT
            </Button>
          </Link>
          <Button variant="danger" onClick={deleteThisBook} className="bookmark-button delete">
            DELETE
          </Button>
        </div>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
