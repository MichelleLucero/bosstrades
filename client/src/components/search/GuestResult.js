import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../../utils/api';

const GuestResult = ({ results, setResults, query }) => {
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
      <div>
        <h1>Companies</h1>
        {results.companies &&
          results.companies.map((result) => {
            const { ticker, company } = result;
            return (
              <div key={ticker}>
                <Link to={'/transaction/company/' + ticker}>
                  <p>{ticker}</p>
                  <p>{company}</p>
                </Link>
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
                <Link to={'/transaction/person/' + person_uid}>
                  <p>{name}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GuestResult;
