'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getAllTheAuthors } from '../../api/authorData';
import AuthorCard from '../../components/AuthorCard';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      getAllTheAuthors(user.uid).then(setAuthors);
    }
  }, [user?.uid]); // Runs when user.uid changes

  return (
    <div className="text-center my-4">
      {user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' ? (
        <p>
          You are logged in as a <strong>Book Manager</strong>. You may edit the authors
        </p>
      ) : (
        <p>
          You are logged in as a <strong>Customer</strong>.
        </p>
      )}
      {user?.uid === 'ryFqlJOPLgd01ATKftErpWMnHpQ2' ? (
        <Link href="/authors/new" passHref>
          <Button variant="warning" style={{ marginBottom: '20px' }}>
            Add an Author
          </Button>
        </Link>
      ) : (
        <p>Please take a look at our amazing Authors who has written all your favorite books!</p>
      )}
      <div className="d-flex flex-wrap">
        {authors.map((author) => (
          <AuthorCard
            key={author.firebaseKey}
            authorObj={author}
            onUpdate={() => getAllTheAuthors(user.uid).then(setAuthors)} // updates after an author is added/updated
            userUid={user.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default AuthorsPage;
