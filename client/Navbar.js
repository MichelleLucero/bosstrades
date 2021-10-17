import React, { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout, loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const guestLinks = (
    <Fragment>
      <Link to='/register'>
        <Button color='inherit'>Register</Button>
      </Link>
      <Link to='/login'>
        <Button color='inherit'>Login</Button>
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Link to='/profile'>
        <Button color='inherit'>Profile</Button>
      </Link>
      <div>
        <Button color='inherit' onClick={onLogout}>
          Logout
        </Button>
      </div>
    </Fragment>
  );

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>🚀 BossTrades</Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
