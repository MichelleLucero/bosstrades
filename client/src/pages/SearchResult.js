import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../components/search/Search';
import api from '../utils/api';

const SearchResult = () => {
  // useParams gets it from the link
  const { query } = useParams();
  //
  const [results, setResults] = useState({ persons: [], companies: [] });

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await api.get(`/search/${query}`);
        setResults(response.data);
        // console.log(results);
      } catch (err) {}
    };
    getSearchResult();
  }, [query]);

  return (
    <div>
      <Search />
      <div>
        <h1>Companies</h1>
        {results.companies &&
          results.companies.map((result) => {
            const { ticker, company } = result;
            return (
              <div key={ticker}>
                <p>{ticker}</p>
                <p>{company}</p>
              </div>
            );
          })}
      </div>
      <div>
        <h1>Person</h1>
        {results.persons &&
          results.persons.map((result) => {
            const { person_uid, name } = result;
            return (
              <div key={person_uid}>
                <p>{name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchResult;
