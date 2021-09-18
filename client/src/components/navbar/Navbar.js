import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  attrLinks: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();
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
      <Link className={classes.attrLinks} to='/register'>
        <Button color='inherit'>Register</Button>
      </Link>
      <Link className={classes.attrLinks} to='/login'>
        <Button color='inherit'>Login</Button>
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Link className={classes.attrLinks} to='/profile'>
        <Button color='inherit'>Profile</Button>
      </Link>
      <div className={classes.attrLinks}>
        <Button color='inherit' onClick={onLogout}>
          Logout
        </Button>
      </div>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            BossTrades
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
