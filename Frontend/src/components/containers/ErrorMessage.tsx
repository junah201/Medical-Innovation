import styled from 'styled-components';
import { Container } from '@/types';

export function ErrorMessage({ children, ...props }: Container) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.errorColor};
  font-size: 12px;
  height: 16px;
`;
