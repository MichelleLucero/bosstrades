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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div>
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
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
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register'>Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>{/* <Copyright /> */}</Box>
    </Container>
  );
};

export default Login;
