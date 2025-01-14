/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/bookData';
import { useAuth } from '../../utils/context/authContext';
import ProfileBookCard from '../../components/ProfileBookCard';

function Profile() {
  // Set a state for books
  const [books, setBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
    console.log(user);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);
  // [] this is a dependecy, if these values inside are changed, this side effect will run again, if we leave it empty this won't run again.

  const cleanedPhotoURL = user.photoURL.replace(/^"|"$/g, '');

  return (
    <div className="text-center my-4">
      <img
        src={cleanedPhotoURL} // Use default image if photoURL is empty
        alt={user.displayName || 'User Profile'} // Provide an alternative alt text
        style={{ maxWidth: '100px', borderRadius: '20%' }} // Optional: Add styling for the image
      />
      <h1>{user.displayName || 'User Profile'}</h1>

      {user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' ? (
        <p style={{ color: 'Orange' }}>
          <strong>Book Manager</strong>.
        </p>
      ) : (
        <p style={{ color: 'blue' }}>
          <strong>Customer</strong>.
        </p>
      )}

      <p>Email: {user.email}</p>
      <p>Total Books: {books.length}</p>
      <h2>Book List:</h2>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <ProfileBookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
