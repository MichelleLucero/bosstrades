import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Search from '../components/search/Search';
import api from '../utils/api';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const SearchResult = () => {
  // useParams gets it from the link
  const { query } = useParams();
  //
  const [results, setResults] = useState({ persons: [], companies: [] });

  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

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

  const followCompany = async (ticker) => {
    if (!isAuthenticated) history.push('/login');
    try {
      const response = await api.post('/member/company/', { ticker });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const followPerson = async (person_uid) => {
    if (!isAuthenticated) history.push('/login');
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
                <Link to={'/transaction/company/' + ticker}>
                  <p>{ticker}</p>
                  <p>{company}</p>
                </Link>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => followCompany(ticker)}
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
                <Link to={'/transaction/person/' + person_uid}>
                  <p>{name}</p>
                </Link>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => followPerson(person_uid)}
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
