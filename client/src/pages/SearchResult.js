import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../components/search/Search';
import { AuthContext } from '../context/AuthContext';
import GuestResult from '../components/search/GuestResult';
import AuthResult from '../components/search/AuthResult';

const SearchResult = () => {
  // useParams gets it from the link
  const { query } = useParams();

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <Search />
      {isAuthenticated ? (
        <AuthResult query={query} />
      ) : (
        <GuestResult query={query} />
      )}
    </div>
  );
};

export default SearchResult;
