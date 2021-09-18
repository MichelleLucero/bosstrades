import React from 'react';
import { useEffect, useContext, useState } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

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

  return (
    <div>
      <div>
        <div>Companies</div>
        {companies &&
          companies.map((company) => {
            return (
              <div key={company.ticker}>
                <p>{company.ticker}</p>
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
