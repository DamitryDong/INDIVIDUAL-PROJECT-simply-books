/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getAuthors } from '../../api/authorData';
import AuthorCard from '../../components/AuthorCard';

function AuthorsPage() {
  // Set a state for books
  const [authors, setAuthors] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // create a function that makes the API call to get all the books
  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
    console.log(user.uid);
  };

  // make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheAuthors();
  }, []);
  // [] this is a dependecy, if these values inside are changed, this side effect will run again, if we leave it empty this won't run again.

  return (
    <div className="text-center my-4">
      <Link href="/authors/new" passHref>
        <Button>Add an Author TODO</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over books here using BookCard component */}
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
        ))}
      </div>
    </div>
  );
}

export default AuthorsPage;
