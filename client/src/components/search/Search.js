import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';

const Search = () => {
  const history = useHistory();
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.push('/search/' + input);
  };

  return (
    <div>
      <Paper>
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
