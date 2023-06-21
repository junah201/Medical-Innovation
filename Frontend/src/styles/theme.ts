import { DefaultTheme } from 'styled-components';

interface ITheme {
  backgroundColor: string;
  errorColor: string;
  validColor: string;
  loginBackgroundColor: string;
  pointColor: string;
  loginDisabledColor: string;
  transitionOption: string;
  headerColor: string;
  borderColor: string;
}

export const theme: DefaultTheme | ITheme = {
  backgroundColor: '#242424',
  errorColor: '#FE0000',
  validColor: '#2763BA',
  loginBackgroundColor: '#F5F5F5',
  pointColor: '#204397',
  loginDisabledColor: '#BDBDBD',
  transitionOption: 'ease-in-out 0.15s',
  headerColor: '#FFFFFF',
  borderColor: '#E0E0E0',
  borderOption: '1px solid #eaeaea',
  boxShadowOption: '0px 4px 5px rgba(0, 0, 0, 0.015)',
};
