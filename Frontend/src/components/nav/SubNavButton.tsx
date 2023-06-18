import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface SubNavButtonProps {
  text: string;
  href: string;
  select: boolean;
}

export const SubNavButton = ({ text, href, select }: SubNavButtonProps) => {
  return (
    <StyledSubNavButton to={href} select={select}>
      {text}
    </StyledSubNavButton>
  );
};

const StyledSubNavButton = styled(Link)<{ select: boolean }>`
  width: calc(100% / 4);
  min-height: 40px;
  text-align: center;

  font-size: 22.5px;
  font-weight: 600;

  color: ${(props) => (props.select ? '#204397' : '#494949')};
  border-bottom: ${(props) => (props.select ? '4px solid #204397' : '1.5px solid #494949')};
  text-decoration: none;

  & + & {
    margin-left: 10px;
  }

  word-break: keep-all;

  @media screen and (max-width: 400px) {
    font-size: 14px;
    min-height: 25px;
  }
  @media screen and (min-width: 401px) and (max-width: 991px) {
    font-size: 14px;
    min-height: 30px;
  }
  @media screen and (min-width: 992px) {
  }
`;
