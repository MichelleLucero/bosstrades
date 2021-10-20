import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#393947', dark: '#22222C' },
    secondary: { main: '#24A9FE', dark: '#1183E5' },
    error: { main: '#EF2A6D', dark: '#D51054' },
    warning: { main: '#FF7F4D', dark: '#FE5B1B' },
    success: { main: '#3EDFAE', dark: '#26C68B' },
    background: { default: '#F3F0FC', header: '#22222C' },
  },
});

export default theme;
