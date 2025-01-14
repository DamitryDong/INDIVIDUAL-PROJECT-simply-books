'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge'; // Import Badge from react-bootstrap
import { deleteSingleAuthor } from '../api/authorData';

function AuthorCard({ authorObj, onUpdate, userUid }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name} ${authorObj.last_name}?`)) {
      deleteSingleAuthor(authorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="author-card">
      <Card.Img variant="top" src={authorObj.image} alt={`${authorObj.first_name} ${authorObj.last_name}`} className="author-card-img" />

      {/* Move Favorited Badge to the Top */}
      {authorObj.favorite && (
        <Badge bg="danger" className="favorited-badge">
          Current Best Seller
        </Badge>
      )}

      <Card.Body className="author-card-body">
        <Card.Title className="author-card-title">
          {authorObj.first_name} {authorObj.last_name}
        </Card.Title>

        <div className="author-card-actions">
          <Link href={`/authors/${authorObj.firebaseKey}`} passHref>
            <Button variant="outline-primary" className="m-0">
              View
            </Button>
          </Link>

          {/* Conditionally Render Edit and Delete Buttons */}
          {userUid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' && (
            <>
              <Link href={`/authors/edit/${authorObj.firebaseKey}`} passHref>
                <Button variant="outline-info" className="m-0">
                  <FaPen />
                </Button>
              </Link>
              <Button variant="outline-danger" onClick={deleteThisAuthor} className="m-0">
                <FaTrashAlt />
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    image: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  userUid: PropTypes.string.isRequired,
};

export default AuthorCard;
