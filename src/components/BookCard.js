'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
import { deleteBook, updateBook } from '../api/bookData';

function BookCard({ bookObj, onUpdate, userUid }) {
  const deleteThisBook = () => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.firebaseKey).then(() => onUpdate());
    }
  };

  const [scale, setScale] = useState(1);

  const publishBook = () => {
    const payload = {
      firebaseKey: bookObj.firebaseKey,
      publish: 'true',
    };
    updateBook(payload).then(() => onUpdate());
  };
  const unpublishBook = () => {
    const payload = {
      firebaseKey: bookObj.firebaseKey,
      publish: 'false',
    };
    updateBook(payload).then(() => onUpdate());
  };

  let publishButton = null;

  if (bookObj?.publish === 'true' && userUid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2') {
    publishButton = (
      <Button
        onClick={unpublishBook}
        className="unpublish-button"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
          backgroundColor: '#ff9933',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          transition: 'transform 0.2s ease-in-out',
          transform: `scale(${scale})`,
        }}
        onMouseEnter={() => setScale(1.1)} // Update scale on hover I GOT FROM CHAT GPT was using some other method that kept erroring
        onMouseLeave={() => setScale(1)} // Reset scale when not hovering I GOT FROM CHAT GPT
      >
        Unpublish
      </Button>
    );
  } else if (bookObj?.publish === 'false' && userUid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2') {
    publishButton = (
      <Button
        onClick={publishBook}
        className="publish-button"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          transition: 'transform 0.2s ease-in-out',
          transform: `scale(${scale})`,
        }}
        onMouseEnter={() => setScale(1.1)} // Update scale on hover I GOT FROM CHAT GPT
        onMouseLeave={() => setScale(1)} // Reset scale when not hovering I GOT FROM CHAT GPT
      >
        Publish
      </Button>
    );
  }

  let badge = null;

  if (bookObj?.publish === 'true') {
    badge = (
      <Badge bg="info" className="Book-status-badge">
        Publish
      </Badge>
    );
  } else if (bookObj?.publish === 'false') {
    badge = (
      <Badge bg="secondary" className="Book-status-badge">
        Unpublish
      </Badge>
    );
  } else if (bookObj?.publish === 'copied') {
    badge = (
      <Badge bg="success" className="Book-status-badge">
        Bought
      </Badge>
    );
  }

  return (
    <div className="book-card">
      <img className="book-image" src={bookObj.image} alt={bookObj.title} />

      {badge}
      <Badge
        style={{
          visibility: 'hidden',
        }}
      >
        -
      </Badge>

      <div className="overlay">
        <h2 className="book-title">{bookObj.title}</h2>
        <p className="book-description" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
          <strong>Description:</strong> {bookObj.description}
        </p>
        <div className="button-container">
          <Link href={`/book/${bookObj.firebaseKey}`} passHref>
            <Button variant="dark" className="bookmark-button view" style={{ marginLeft: '20px' }}>
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
          {publishButton}
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
    publish: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  userUid: PropTypes.string,
};

export default BookCard;
