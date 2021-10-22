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
      <Link to='/register' style={{ textDecoration: 'none' }}>
        <Button color='secondary'>Register</Button>
      </Link>
      <Link to='/login' style={{ textDecoration: 'none' }}>
        <Button color='secondary'>Login</Button>
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Link to='/profile' style={{ textDecoration: 'none' }}>
        <Button color='secondary'>Profile</Button>
      </Link>
      <div>
        <Button color='secondary' onClick={onLogout}>
          Logout
        </Button>
      </div>
    </Fragment>
  );

  return (
    <div>
      <AppBar position='fixed' elevation={0} sx={{ bgcolor: 'primary.dark' }}>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
              🚀 BossTrades
            </Link>
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
