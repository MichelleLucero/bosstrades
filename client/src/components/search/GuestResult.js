import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const GuestResult = ({ results, followCompany, followPerson }) => {
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

export default GuestResult;
