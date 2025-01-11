'use client';

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
    console.log(authorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">WORK IN PROGRESS</div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
