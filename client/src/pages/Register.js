import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/core/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const history = useHistory();
  const [cred, setCred] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const { isAuthenticated, register } = useContext(AuthContext);

  const onChange = (e) => setCred({ ...cred, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password } = cred;
    if (
      first_name === '' ||
      last_name === '' ||
      email === '' ||
      password === ''
    ) {
      console.error('please fill in all fields');
    } else {
      register(cred);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      // textAlign='center'
      justifyContent='center'
      style={{ minHeight: '100vh' }}
    >
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box sx={{ bgcolor: 'white', padding: '4%', borderRadius: '2.5%' }}>
          <Typography component='h1' variant='h5' align='center'>
            Create Account
          </Typography>
          <form onSubmit={onSubmit} noValidate>
            <Box
              sx={{
                display: 'flex',
                columnGap: '15px',
              }}
            >
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='firstName'
                label='First Name'
                name='first_name'
                autoComplete='given-name'
                onChange={onChange}
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='last_name'
                autoComplete='family-name'
                onChange={onChange}
              />
            </Box>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={onChange}
              autoComplete='current-password'
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '4px',
              }}
            >
              <Button type='submit' variant='contained' color='primary'>
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
      <Box sx={{ marginTop: '2.2%' }}>
        Already have an account?{' '}
        <Link to='/login' style={{ textDecoration: 'none' }}>
          Login
        </Link>
      </Box>
    </Grid>
  );
};

export default Register;
