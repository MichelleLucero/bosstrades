import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

const GuestResult = ({ query }) => {
  const [companies, setCompanies] = useState();
  const [persons, setPersons] = useState();

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await api.get(`/search/${query}`);
        setCompanies(response.data.companies);
        setPersons(response.data.persons);

        // console.log(results);
      } catch (err) {}
    };
    getSearchResult();
  }, [query]);

  return (
    <div>
      <div>
        <h1>Companies</h1>
        {companies &&
          companies.map((result) => {
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
        {persons &&
          persons.map((result) => {
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
