import { createTheme } from '@mui/material/styles';

export const Palette = () => {
  return createTheme({
    palette: {
      mode: 'light',
      common: {
        black: '#000',
        white: '#fff',
      },
      primary: {
        main: '#204397',
        dark: '#204397',
        light: '#2763BA',
        contrastText: '#fff',
      },
      secondary: {
        main: '#8c8c8c',
        dark: '#262626',
        light: '#d9d9d9',
      },
    },
  });
};

export default Palette;
