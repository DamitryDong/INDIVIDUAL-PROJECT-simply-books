'use client';

import React, { useEffect, useState } from 'react';
import { viewBookDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});

  const { firebaseKey } = params;

  useEffect(() => {
    viewBookDetails(firebaseKey).then(setBookDetails);
  }, [firebaseKey]);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Image Column */}
        <div className="col-md-4">
          <img src={bookDetails.image} alt={bookDetails.title} className="img-fluid rounded shadow-sm" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        {/* Details Column */}
        <div className="col-md-8">
          <div className="text-black p-4 rounded bg-white shadow-sm">
            <h3 className="mb-3 text-dark font-weight-bold">
              <strong>{bookDetails.title}</strong>
            </h3>
            <h5 className="mb-3 text-muted">
              by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name} {bookDetails.authorObject?.favorite ? '🤍' : ''}
            </h5>

            <p className="text-muted mb-3">
              <strong>Author Email:</strong>{' '}
              <a href={`mailto:${bookDetails.authorObject?.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                {bookDetails.authorObject?.email}
              </a>
            </p>

            <p className="lead mb-3">{bookDetails.description || 'No description available.'}</p>
            <hr />

            <div className="d-flex align-items-center">{bookDetails.sale ? <span className="badge bg-danger text-white p-2 mr-3">🏷️ Sale ${bookDetails.price}</span> : <span className="text-success font-weight-bold">${bookDetails.price}</span>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
