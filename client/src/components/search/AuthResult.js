import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useEffect } from 'react';

export const AuthResult = ({ results, setResults, query }) => {
  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await api.get(`/search/following/${query}`);
        setResults(response.data);

        // console.log(results);
      } catch (err) {}
    };
    getSearchResult();
  }, [query]);

  const followCompany = async (ticker) => {
    try {
      const response = await api.post('/member/company/', { ticker });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const followPerson = async (person_uid) => {
    try {
      const response = await api.post('/member/person/', { person_uid });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Companies</h1>
        {results.companies &&
          results.companies.map((result) => {
            const { ticker, company, following } = result;
            return (
              <div key={ticker}>
                <Link to={'/transaction/company/' + ticker}>
                  <p>{ticker}</p>
                  <p>{company}</p>
                </Link>
                {following ? (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={() => followCompany(ticker)}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={() => followCompany(ticker)}
                  >
                    Follow
                  </Button>
                )}
              </div>
            );
          })}
      </div>
      <div>
        <h1>Person</h1>
        {results.persons &&
          results.persons.map((result) => {
            const { person_uid, name, following } = result;
            return (
              <div key={person_uid}>
                <Link to={'/transaction/person/' + person_uid}>
                  <p>{name}</p>
                </Link>
                {following ? (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={() => followPerson(person_uid)}
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={() => followPerson(person_uid)}
                  >
                    Follow
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AuthResult;
