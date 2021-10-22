import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Container, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Container maxWidth='md' sx={{ marginTop: '110px' }}>
      <List sx={{ bgcolor: 'white' }}>
        <Typography variant='h4' component='div' align='center'>
          Companies
        </Typography>
        {companies &&
          companies.map((company) => {
            return (
              <ListItem
                key={company.ticker}
                secondaryAction={
                  <IconButton>
                    <DeleteIcon
                      type='submit'
                      variant='contained'
                      color='primary'
                      onClick={() => unfollowCompany(company.ticker)}
                    ></DeleteIcon>
                  </IconButton>
                }
              >
                <Link to={'/transaction/company/' + company.ticker}>
                  {company.ticker}
                </Link>
              </ListItem>
            );
          })}
      </List>
      <List sx={{ bgcolor: 'white' }}>
        <Typography variant='h4' component='div' align='center'>
          Persons
        </Typography>
        {persons &&
          persons.map((person) => {
            return (
              <ListItem
                key={person.person_uid}
                secondaryAction={
                  <IconButton>
                    <DeleteIcon
                      type='submit'
                      variant='contained'
                      color='primary'
                      onClick={() => unfollowPerson(person.person_uid)}
                    ></DeleteIcon>
                  </IconButton>
                }
              >
                <Link to={'/transaction/person/' + person.person_uid}>
                  <p>{person.name}</p>
                </Link>
              </ListItem>
            );
          })}
      </List>
    </Container>
  );
};

export default Profile;
