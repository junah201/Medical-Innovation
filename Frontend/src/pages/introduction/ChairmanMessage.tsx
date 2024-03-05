import styled from 'styled-components';

import { IntroductionSubNav, Message } from '@/components';
import { DEVICES } from '@/constants';

export const ChairmanMessage = () => {
  return (
    <>
      <IntroductionSubNav select="이사장 인사말" />
      <h1>
        <span>이승규</span> 이사장
      </h1>
      <Message>
        <StyledChairmanProfile>
          <div>
            <p>
              2023~ 한국미생물생물공학회 부회장
              <br />
              2022~ 코스닥시장 기업심사위원회 심의위원단 위원
              <br />
              2022~ 과학기술정보통신부'R&D투자혁신자문단' 자문위원
              <br />
              2022~ 국회산하 한국과학기술정책연구회 이사
              <br />
              2021~ 국가과학기술자문위원회 미래인재특별위원회 위원
              <br />
              2020~ 국가과학기술자문위원회 범부처 감염병 대응
              <br />
              2020~ 국가과학기술자문회의 다부처 공동기획사업 추진위원
              <br />
              2018~ 국가신약개발재단투자심의위원/이사
              <br />
              2012~ 한국바이오협회 상임부회장
              <br />
              연구개발추진위원회 위원
              <br />
              2000~2011 신약개발 바이오벤쳐 포휴먼텍 대표이사
            </p>
            <h4>Education</h4>
            <p>
              연세대학교 대학원 세라믹공학 공학박사
              <br />
              연세대학교 대학원 세라믹공학 공학석사
              <br />
              연세대학교 세라믹공학 공학사
            </p>
          </div>
          <img
            src="/images/이승규.jpg"
            alt="이승규"
            height="300px"
            width="260px"
          />
        </StyledChairmanProfile>
        <br />
        <br />
        <br />
        재단법인 미래의학연구재단에서는 선 순환 바이오산업 및 연구지원
        및 창업 생태계 시스템 구축을 목표로 연구자, 의료기관,
        바이오벤처 간 상호연계 협력 채널을 구축하여 바이오헬스 기술의
        성공적인 사업화를 지원하고 혁신 기업들이 성장할 수 있도록
        실질적 맞춤형 협력 프로그램을 운영하고 있습니다.
        <br />
        재단에서는 바이오 벤처 경연대회, 산·학·연 매칭 사이언스 포럼
        등을 통해 바이오헬스 기업과 연구기관 간 수요와 공급을 맞출 수
        있는 혁신적 비즈니스 네트워크를 꾸준히 지원하고 있습니다. 또한
        연구자 중심 창업지원, 연구발굴 지원 사업 등을 통해 유망 기술
        기업의 창업을 지원하고, 미래 유망기술 발굴과 기술 보급하여
        산업 생태계를 활성화하는데 적극 노력하고 있습니다.
        <br />
        재단은 산·학·연·병 간 더 많은 협업 결과와 혁신적인 성과를
        이루어 낼 수 있도록 지원을 다양화하여 병원, 벤처, 산업의
        중심이 될 것입니다. 더불어 산·학·연과 벤처기업 간
        오픈이노베이션을 촉진하고 이를 통해 파생된 기술들이 글로벌
        경쟁력을 높일 수 있도록 하여 국내 바이오기업의 글로벌 진출을
        확대하고, 대한민국 바이오헬스 산업의 성장과 산업계 활성화에
        기여할 것입니다.
        <br />
        재단법인 미래의학연구재단 이사장
      </Message>
    </>
  );
};

const StyledChairmanProfile = styled.div`
  display: flex;

  & > div > * + * {
    margin-top: 10px;
  }

  & > div {
    display: flex;
    flex-direction: column;
  }

  & > div > h1 {
    font-size: 25px;
    border-left: 5px solid #204397;
    padding-left: 3px;
  }
  & > div > h1 > span {
    font-size: 30px;
  }
  & > div > h4 {
    font-size: 25px;
    border-left: 5px solid transparent;
    padding-left: 3px;
  }

  & > div > p {
    font-size: 18px;
  }

  @media screen and (${DEVICES.MOBILE}) {
    flex-direction: column;

    & > img {
      margin-left: 0px;
    }

    & p {
      font-size: 16px;
    }
  }
  @media screen and (${DEVICES.DESKTOP}) {
    & > img {
      margin-left: 50px;
    }

    & p {
      padding-left: 16px;
    }
  }
`;
