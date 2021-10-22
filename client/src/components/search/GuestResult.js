import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import api from '../../utils/api';
import Container from '@mui/material/Container';

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
    <Container maxWidth='md'>
      <List sx={{ bgcolor: 'white' }}>
        {/* <h1>Companies</h1> */}
        {companies &&
          companies.map((result) => {
            const { ticker, company } = result;
            return (
              <ListItem key={ticker}>
                <Link to={'/transaction/company/' + ticker}>
                  <p>{ticker}</p>
                  <p>{company}</p>
                </Link>
              </ListItem>
            );
          })}
      </List>
      <List sx={{ bgcolor: 'white' }}>
        {/* <h1>Person</h1> */}
        {persons &&
          persons.map((result) => {
            const { person_uid, name } = result;
            return (
              <ListItem key={person_uid}>
                <Link to={'/transaction/person/' + person_uid}>
                  <p>{name}</p>
                </Link>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
};

export default GuestResult;
