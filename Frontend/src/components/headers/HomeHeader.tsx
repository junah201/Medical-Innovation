import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  HEADER,
  DEVICES,
  ROUTE,
  COOKIE,
} from '@/constants';
import { getCookie } from '@/libs/Cookie';

export const HomeHeader = () => {
  const isLoggedIn = !!getCookie(COOKIE.KEY.ACCESS_TOKEN);

  return (
    <>
      <TopWrapper>
        <Link to={ROUTE.HOME}>
          <img
            src="/images/long_logo.png"
            alt="미래의학연구재단"
          />
        </Link>
        {isLoggedIn ? (
          <NavContainer>
            <Link to={ROUTE.ME}>마이페이지</Link>
            <Link to={ROUTE.LOGOUT}>로그아웃</Link>
          </NavContainer>
        ) : (
          <NavContainer>
            <Link to={ROUTE.LOGIN}>로그인</Link>
          </NavContainer>
        )}
      </TopWrapper>
      <BottomWrapper>
        <StyledUl>
          <HeaderNavLi
            link={ROUTE.INTRODUCTION.ROOT}
            text="재단소개"
          />
          <HeaderNavLi
            link={ROUTE.PROGRAM.ROOT}
            text="사업소개"
          />
          <HeaderNavLi
            link={ROUTE.NEWS.ROOT}
            text="재단소식"
          />
          <HeaderNavLi
            link={ROUTE.SUPPORT.SPONSORSHIP}
            text="후원안내"
          />
        </StyledUl>
      </BottomWrapper>
    </>
  );
};

const HeaderNavLi = ({
  link,
  text,
}: {
  link: string;
  text: string;
}) => {
  return (
    <StyledLi>
      <Link to={link}>{text}</Link>
    </StyledLi>
  );
};

const TopWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.headerColor};
  border-bottom: 1px solid
    ${({ theme }) => theme.borderColor};

  & img {
    height: 100%;
  }

  @media screen and (${DEVICES.MOBILE}) {
    height: ${HEADER.MOBILE_HEIGHT};
    font-size: ${HEADER.MOBILE_FONT_SIZE};
    padding: 0 5%;
  }

  @media screen and (${DEVICES.DESKTOP}) {
    height: ${HEADER.DESKTOP_HEIGHT};
    font-size: ${HEADER.DESKTOP_FONT_SIZE};
    padding: 0 10%;
  }
`;

const BottomWrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.headerColor};
  box-shadow: 0px 4px 20px -20px gray;
  padding: 0 10%;

  @media screen and (${DEVICES.MOBILE}) {
    height: ${HEADER.MOBILE_HEIGHT};
  }

  @media screen and (${DEVICES.DESKTOP}) {
    height: ${HEADER.DESKTOP_HEIGHT};
  }
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 900px;
  height: 100%;

  & a + a {
    margin-left: 20px;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StyledLi = styled.li`
  display: inline-block;

  & a {
    white-space: nowrap;
    overflow: hidden;
    font-size: 30px;
    font-weight: 500;
    text-decoration: none;
    color: #000000;
  }
  &:hover a {
    text-decoration: underline;
  }

  @media screen and (${DEVICES.MOBILE}) {
    & a {
      font-size: 16px;
      font-weight: 600;
    }
  }
  @media screen and (${DEVICES.DESKTOP}) {
    & a {
      font-size: 30px;
    }
  }
`;
