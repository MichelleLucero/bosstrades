import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useEffect, useState } from 'react';

export const AuthResult = ({ query }) => {
  const [companies, setCompanies] = useState();
  const [persons, setPersons] = useState();

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await api.get(`/search/following/${query}`);
        setCompanies(response.data.companies);
        setPersons(response.data.persons);

        // console.log(results);
      } catch (err) {}
    };
    getSearchResult();
  }, [query]);

  const followCompany = async (ticker) => {
    try {
      const response = await api.post('/member/company/', { ticker });
      setCompanies(
        companies.map((company) =>
          company.ticker === ticker
            ? {
                ...company,
                following: true,
              }
            : company
        )
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const followPerson = async (person_uid) => {
    try {
      const response = await api.post('/member/person/', { person_uid });
      setPersons(
        persons.map((person) =>
          person.person_uid === person_uid
            ? {
                ...person,
                following: true,
              }
            : person
        )
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const unfollowCompany = async (ticker) => {
    try {
      const response = await api.delete('/member/company/', {
        data: { ticker },
      });
      setCompanies(
        companies.map((company) =>
          company.ticker === ticker
            ? {
                ...company,
                following: false,
              }
            : company
        )
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const unfollowPerson = async (person_uid) => {
    try {
      const response = await api.delete('/member/person/', {
        data: { person_uid },
      });
      setPersons(
        persons.map((person) =>
          person.person_uid === person_uid
            ? {
                ...person,
                following: false,
              }
            : person
        )
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Companies</h1>
        {companies &&
          companies.map((result) => {
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
                    onClick={() => unfollowCompany(ticker)}
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
        {persons &&
          persons.map((result) => {
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
                    onClick={() => unfollowPerson(person_uid)}
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
