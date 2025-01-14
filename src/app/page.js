/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

function Home() {
  // Set a state for books
  const [books, setBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
    console.log(user.uid);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <div className="text-center my-4">
      {/* Conditional rendering based on user UID */}
      {user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' ? (
        <p>
          You are logged in as a <strong>Book Manager</strong>.
        </p>
      ) : (
        <p>
          You are logged in as a <strong>Customer</strong>. Please navigate to the Book Shop to buy a book!
          <br />
          As a customer you do not have permission to create new books and authors.
        </p>
      )}

      {/* Add Book Button visible for managers */}
      {user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' && (
        <Link href="/book/new" passHref>
          <Button variant="warning" style={{ marginBottom: '40px' }}>
            ADMIN: Add A Book
          </Button>
        </Link>
      )}

      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} userUid={user.uid} />
        ))}
      </div>
    </div>
  );
}

export default Home;
