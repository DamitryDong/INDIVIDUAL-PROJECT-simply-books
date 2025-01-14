'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

function ProfileBookCard({ bookObj }) {
  return (
    <Card
      style={{
        width: '150px',
        margin: '10px',
        paddingRight: '8px',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
        background: 'linear-gradient(145deg,rgba(246, 246, 246, 0.94),rgb(225, 225, 225))',
        border: 'none',
      }}
    >
      <Card.Img
        variant="top"
        src={bookObj.image}
        alt="Book Image"
        style={{
          height: '200px',
          objectFit: 'cover',
          marginBottom: '10px',
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
        }}
      />
    </Card>
  );
}

ProfileBookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
  }).isRequired,
};

export default ProfileBookCard;
