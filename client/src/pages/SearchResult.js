import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../components/search/Search';
import { AuthContext } from '../context/AuthContext';
import GuestResult from '../components/search/GuestResult';
import AuthResult from '../components/search/AuthResult';

const SearchResult = () => {
  // useParams gets it from the link
  const { query } = useParams();
  //
  const [results, setResults] = useState({ persons: [], companies: [] });

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <Search />
      {isAuthenticated ? (
        <AuthResult results={results} setResults={setResults} query={query} />
      ) : (
        <GuestResult results={results} setResults={setResults} query={query} />
      )}
    </div>
  );
};

export default SearchResult;
