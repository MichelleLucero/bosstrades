import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';

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
    <Box
      component='form'
      onSubmit={onSubmit}
      sx={{
        marginTop: '35px',
        padding: '75px 210px 45px 210px',
        bgcolor: 'primary.main',
      }}
    >
      <TextField
        id='outlined-basic'
        label='Ticker / Person'
        margin={'normal'}
        onChange={onChange}
        helperText='Example: AAPL'
        InputProps={{
          sx: {
            bgcolor: 'white',
          },
          endAdornment: (
            <InputAdornment position='end'>
              {' '}
              <IconButton type='submit' aria-label='search'>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{ sx: { color: 'gray' } }}
        InputLabelProps={{
          variant: 'filled',
        }}
        fullWidth
      />
      {/* <IconButton type='submit' aria-label='search'>
        <SearchIcon />
      </IconButton> */}
    </Box>
  );
};

export default Search;
