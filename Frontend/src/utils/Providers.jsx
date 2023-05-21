import { theme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';

export const Providers = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
