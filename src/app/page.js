'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';
import Search from '../components/Search';

function Home() {
  // Set a state for books and filteredBooks
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then((fetchedBooks) => {
      setBooks(fetchedBooks);
      setFilteredBooks(fetchedBooks);
    });
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  // onSearch function to filter books based on search term
  const handleSearch = (term) => {
    const filtered = books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase())); // PLease note we filtered for data, this handle search happens once on screen load and also is included in the component to be used again for the component
    setFilteredBooks(filtered);
  };

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

      <div>
        {/* Pass the handleSearch function to the Search component */}
        <Search type="books" onSearch={handleSearch} />
      </div>

      <div className="d-flex flex-wrap">
        {/* Display filteredBooks instead of books */}
        {filteredBooks.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} userUid={user.uid} />
        ))}
      </div>
    </div>
  );
}

export default Home;
