/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/bookData';
import { useAuth } from '../../utils/context/authContext';
import ProfileBookCard from '../../components/ProfileBookCard';

function Profile() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
  };

  useEffect(() => {
    getAllTheBooks();
  }, []);

  const cleanedPhotoURL = user.photoURL.replace(/^"|"$/g, '');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ flex: '1', textAlign: 'center' }}>
          <img
            src={cleanedPhotoURL}
            alt={user.displayName || 'User Profile'}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '20%',
              objectFit: 'cover',
              marginTop: '50px',
            }}
          />
          <h1>{user.displayName || 'User Profile'}</h1>
          <p>Email: {user.email}</p>
          <p>
            Role: <strong style={{ color: user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' ? 'orange' : 'blue' }}>{user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' ? 'Book Manager' : 'Customer'}</strong>
          </p>
          <p>Total Books: {books.length}</p>
        </div>
        <div style={{ flex: '2' }}>
          <h2 style={{ textAlign: 'center', paddingBottom: '15px' }}>
            <strong>Books</strong>
          </h2>
          {books.length === 0 ? (
            <p style={{ color: 'gray' }}>No books found in your list.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
              }}
            >
              {books.map((book) => (
                <ProfileBookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
