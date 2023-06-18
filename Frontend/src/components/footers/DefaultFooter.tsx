import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { DEVICES, FOOTER } from '@/constants';

export const DefaultFooter = () => {
  return (
    <Wrapper>
      <TopContainer>
        <div>
          <a href="/">
            <img src="/images/long_logo.png" alt="미래의학연구재단" />
          </a>
          <a href="http://www.celltherapy.re.kr" target="_blank" rel="noopener noreferrer">
            <img src="/images/세포치료실용화센터CI.png" alt="세포치료실용화센터CI" />
          </a>
          <a href="https://www.khidi.or.kr/rndhospital" target="_blank" rel="noopener noreferrer">
            <img src="/images/연구중심병원.png" alt="연구중심병원" />
          </a>
        </div>

        <div>
          <a href="https://www.khidi.or.kr/rndhospital" target="_blank" rel="noopener noreferrer">
            <img src="/images/협동과정줄기세포생물학.png" alt="협동과정줄기세포생물학" />
          </a>
          <a href="https://www.msit.go.kr/" target="_blank" rel="noopener noreferrer">
            <img src="/images/과학기술정보통신부.png" alt="과학기술정보통신부" />
          </a>
        </div>
      </TopContainer>
      <StyledBottomFooter>
        <div>
          <strong>재단법인 미래의학연구재단</strong>
          <p>이사장 : 전승호</p>
          <p>주소 : (04736) 서울특별시 성동구 독서당로 166</p>
          <p>Copyright(c) 2016 재단법인 미래의학연구재단. All rights reserved.</p>
        </div>
        <div>
          <strong>관련 링크</strong>
          <Link to="/privacy-policy">개인정보처리방침</Link>
          <Link to="/mou">협력기관</Link>
          <Link to="/advisory_group">임원현황</Link>
        </div>
      </StyledBottomFooter>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  border-top: 1px solid #000000;
  overflow: hidden;
  width: 100%;

  @media screen and (${DEVICES.MOBILE}) {
    height: ${FOOTER.MOBILE_HEIGHT};
  }
  @media screen and (${DEVICES.DESKTOP}) {
    height: ${FOOTER.DESKTOP_HEIGHT};
  }
`;

const TopContainer = styled.div`
  height: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media screen and (${DEVICES.MOBILE}) {
    display: block;
    padding: 0;

    & > div {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      justify-items: center;
    }

    & img {
      height: 40px;
    }
  }
  @media screen and (${DEVICES.DESKTOP}) {
    & img {
      height: 60px;
    }
  }
`;

const StyledBottomFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 50%;
  background-color: #474747;

  & a:hover {
    text-decoration: underline;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  & * {
    color: #ffffff;
  }
  & > * + * {
    margin-left: 30px;
  }

  @media screen and (${DEVICES.MOBILE}) {
    & * {
      font-size: 10px;
    }
    & br {
    }
  }
  @media screen and (${DEVICES.DESKTOP}) {
    & * {
      font-size: 16px;
    }

    & br {
    }
  }
`;
