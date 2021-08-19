import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    marginTop: '16px',
  },
}));

const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push('/' + input);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <form onSubmit={onSubmit}>
          <TextField
            id='outlined-basic'
            label='Outlined'
            variant='outlined'
            onChange={onChange}
          />
          <IconButton type='submit' aria-label='search'>
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
    </div>
  );
};

export default Search;
