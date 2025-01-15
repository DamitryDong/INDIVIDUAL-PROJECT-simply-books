'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getAllTheAuthors } from '../../api/authorData';
import AuthorCard from '../../components/AuthorCard';
import Search from '../../components/Search';

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const { user } = useAuth();

  // Use Effect = initial setup!
  useEffect(() => {
    if (user?.uid) {
      getAllTheAuthors(user.uid).then((fetchedAuthors) => {
        setAuthors(fetchedAuthors);
        setFilteredAuthors(fetchedAuthors);
      });
    }
  }, [user?.uid]);

  // Used to handle search literally copied from main page and refractored for this
  const handleSearch = (term) => {
    const filtered = authors.filter((author) => author.last_name.toLowerCase().includes(term.toLowerCase())); // PLease note we filtered for data, this handle search happens once on screen load and also is included in the component to be used again for the component
    setFilteredAuthors(filtered);
  };

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

      <Search type="authors" onSearch={handleSearch} />

      <div className="d-flex flex-wrap">
        {filteredAuthors.map((author) => (
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
