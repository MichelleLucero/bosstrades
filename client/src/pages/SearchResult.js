import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../components/search/Search';
import api from '../utils/api';
import Button from '@material-ui/core/Button';

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

  const addCompany = async (ticker) => {
    try {
      const response = await api.post('/member/company/', { ticker });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const addPerson = async (person_uid) => {
    try {
      const response = await api.post('/member/person/', { person_uid });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

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
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => addCompany(ticker)}
                >
                  Follow
                </Button>
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
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => addPerson(person_uid)}
                >
                  Follow
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchResult;
