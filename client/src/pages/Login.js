import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const history = useHistory();
  const [cred, setCred] = useState({ email: '', password: '' });
  const { isAuthenticated, login } = useContext(AuthContext);

  const onChange = (e) => setCred({ ...cred, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
  }, [history, isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (cred.email === '' || cred.password === '') {
      console.error('please fill in all fields');
    } else {
      console.log('logout sumbit');
      login(cred);
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
          <Avatar sx={{ margin: 'auto' }}>
            <LockIcon />
          </Avatar>
          <Typography component='h1' variant='h5' align='center'>
            Sign in
          </Typography>
          <form onSubmit={onSubmit} noValidate>
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
              autoFocus
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
            <Box sx={{ margin: '4px 0px' }}>
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ float: 'right', marginTop: '4px' }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link to='#' variant='body2' style={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item xs>
                <Link to='/register'>Don't have an account? Sign Up</Link>
              </Grid> */}
            </Grid>
          </form>
        </Box>
      </Container>
      <Box sx={{ marginTop: '2.2%' }}>
        Don't have an account?{' '}
        <Link to='/register' style={{ textDecoration: 'none' }}>
          Sign Up
        </Link>
      </Box>
    </Grid>
  );
};

export default Login;
