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
}

export const theme: DefaultTheme | ITheme = {
  backgroundColor: '#242424',
  errorColor: '#EF476F',
  validColor: '#06D6A0',
  loginBackgroundColor: '#F5F5F5',
  pointColor: '#204397',
  loginDisabledColor: '#BDBDBD',
  transitionOption: 'ease-in-out 0.15s',
  headerColor: '#FFFFFF',
};
