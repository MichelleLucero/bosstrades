import React from 'react';
import { useEffect, useContext, useState } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Button from '@material-ui/core/Button';

const Profile = () => {
  // const { isAuthenticated } = useContext(AuthContext);

  const [companies, setCompanies] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await api.get('/member/company/');
        console.log(response.data);
        setCompanies(response.data);
      } catch (err) {}
    };

    const getPersons = async () => {
      try {
        const response = await api.get('/member/person/');
        console.log(response.data);
        setPersons(response.data);
      } catch (err) {}
    };
    getCompanies();
    getPersons();
  }, []);

  const unfollowCompany = async (ticker) => {
    try {
      const response = await api.delete('/member/company/', {
        data: { ticker },
      });
      setCompanies(
        companies.filter((company) => {
          return company.ticker !== ticker;
        })
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
        persons.filter((person) => {
          return person.person_uid !== person_uid;
        })
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <div>Companies</div>
        {companies &&
          companies.map((company) => {
            return (
              <div key={company.ticker}>
                <p>{company.ticker}</p>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => unfollowCompany(company.ticker)}
                >
                  Unfollow
                </Button>
              </div>
            );
          })}
      </div>
      <div>
        <div>Persons</div>
        {persons &&
          persons.map((person) => {
            return (
              <div key={person.person_uid}>
                <p>{person.name}</p>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={() => unfollowPerson(person.person_uid)}
                >
                  Unfollow
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
