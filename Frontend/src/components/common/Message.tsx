import styled from 'styled-components';

import { DEVICES } from '@/constants';

export const Message = ({ children }: { children: React.ReactNode }) => {
  return <StyledMessage>{children}</StyledMessage>;
};

const StyledMessage = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #f7f7f7;

  & > * + * {
    margin-top: 10px;
  }

  & p {
    padding-left: 5px;
  }

  & p > strong {
    margin: 0 5px;
  }

  & a:hover {
    text-decoration: underline;
  }

  @media screen and (${DEVICES.MOBILE}) {
    font-size: 16px;

    & p > span {
      font-weight: 600;
      font-size: 20px;
    }
  }
  @media screen and (${DEVICES.DESKTOP}) {
    font-size: 20px;

    & p > span {
      font-weight: 600;
      font-size: 24px;
    }
  }
`;
