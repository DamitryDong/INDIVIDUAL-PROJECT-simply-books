'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ProfileBookCard({ bookObj }) {
  return (
    <Card style={{ width: '9rem', margin: '5px' }}>
      <Card.Img variant="top" src={bookObj.image} alt="Book Image" style={{ height: '200px' }} />
    </Card>
  );
}

ProfileBookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
};

export default ProfileBookCard;
