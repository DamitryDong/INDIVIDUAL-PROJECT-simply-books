'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { viewAuthorDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  useEffect(() => {
    // I wrote this to for debugging, was having issues with the aurthorDetails object
    if (authorDetails.last_name) {
      console.log(authorDetails);
    }
  }, [authorDetails]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt="picture of author" style={{ width: '300px' }} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a>
        <p>Books:</p>
        <ul>{authorDetails.books && authorDetails.books.length > 0 ? authorDetails.books.map((book) => <li key={book.firebaseKey}>{book.title}</li>) : <p>No books available.</p>}</ul>
      </div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
