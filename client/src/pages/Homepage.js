import React from 'react';
import Search from '../components/search/Search';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

const Homepage = () => {
  return (
    <Paper sx={{ height: '100vh', bgcolor: 'primary.main' }}>
      <Typography
        variant='h3'
        component='div'
        align='center'
        sx={{ paddingTop: '180px', color: 'white', fontWeight: '600' }}
      >
        Search your favorite company or executive
      </Typography>
      <Search />
    </Paper>
  );
};

export default Homepage;
