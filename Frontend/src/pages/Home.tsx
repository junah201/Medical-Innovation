import styled from 'styled-components';

import { MainLeftGrid, MainRightGrid, Popups } from '@/components';

export const Home = () => {
  return (
    <>
      <Popups />
      <Title>Foundation for Medical Innovation</Title>
      <Description>
        재단법인 미래의학연구재단은 과학기술정보통신부 소관
        <br />
        비영리법인 · 지정기부금단체 · 중소벤처기업부 등록
        창업기획자입니다.
      </Description>
      <Wrapper>
        <MainLeftGrid />
        <MainRightGrid />
      </Wrapper>
    </>
  );
};

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
  width: 100%;

  @media screen and (max-width: 991px) {
    display: none;
  }
  @media screen and (min-width: 992px) {
  }
`;

const Description = styled.span`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  display: block;
  width: 100%;
  @media screen and (max-width: 991px) {
    font-size: 3vw;
    font-weight: 600;
  }
  @media screen and (max-width: 1420px) {
    & br {
      display: block;
    }
  }
  @media screen and (min-width: 1421px) {
    & br {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;

  @media screen and (max-width: 991px) {
    padding: 0px;
  }
  @media screen and (min-width: 992px) {
  }

  & > * + * {
    margin-left: 40px;
  }
`;
