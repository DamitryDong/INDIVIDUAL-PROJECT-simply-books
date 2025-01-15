/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { getPublishBooks } from '../../api/bookData';
import { useAuth } from '../../utils/context/authContext';
import CommunityBookCard from '../../components/CommunityBookCard';
import Search from '../../components/Search';

function Home() {
  // Set a state for books
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getPublishBooks(user.uid).then((fetchedBooks) => {
      setBooks(fetchedBooks);
      setFilteredBooks(fetchedBooks);
    });
  };

  // onSearch function to filter books based on search term
  const handleSearch = (term) => {
    const filtered = books.filter((book) => book.title.toLowerCase().includes(term.toLowerCase())); // PLease note we filtered for data, this handle search happens once on screen load and also is included in the component to be used again for the component
    setFilteredBooks(filtered);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);
  // [] this is a dependecy, if these values inside are changed, this side effect will run again, if we leave it empty this won't run again.

  return (
    <div className="text-center my-4">
      <h1 style={{ marginBottom: '30px' }}>No You Can NOT Actually Pay, so SHOP AWAY!!!</h1>
      <Search type="books" onSearch={handleSearch} />
      <div className="d-flex flex-wrap">
        {filteredBooks.map((book) => (
          <CommunityBookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </div>
  );
}

export default Home;
