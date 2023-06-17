import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { INPUT_TYPE, ROUTE, COOKIE } from '@/constants';
import { getCookie, setCookie } from '@/libs/Cookie';

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie(COOKIE.KEY.ACCESS_TOKEN);
    if (accessToken) {
      navigate(ROUTE.HOME);
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>로그인</Title>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media screen and (max-width: 991px) {
    padding: 15;
    min-height: calc(100vh - 200px);
  }
  @media screen and (min-width: 992px) {
    min-height: calc(100vh - 400px);
  }
`;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 30px 80px;

  width: 410px;
  padding: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  & form {
    display: flex;
    flex-direction: column;
  }

  & button {
    height: 45px;
    margin-top: 10px;
    width: 100%;
    background: #204397;
    border: none;
    color: #ffffff;
    padding: 5px;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
  }

  & a {
    text-align: center;
    width: 100%;
    padding: 5px;
  }

  & a:hover {
    text-decoration: underline;
  }

  & p {
    font-weight: 600;
    color: red;
    font-size: 16px;
    height: 21px;
  }
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  border-left: none;
`;
