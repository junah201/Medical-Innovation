import styled from 'styled-components';

import { IntroductionSubNav, Message } from '@/components';
import { DEVICES } from '@/constants';

export const ChairmanMessage = () => {
  return (
    <>
      <IntroductionSubNav select="이사장 인사말" />
      <h1>
        <span>전승호</span> 이사장
      </h1>
      <Message>
        <StyledChairmanProfile>
          <div>
            <p>
              2018~ 대웅제약 대표이사
              <br />
              2019~ KAIST 융합의과학원 자문위원
              <br />
              2021~ 대한약학회 이사
              <br />
              2022~ 제3대 재단법인 미래의학연구재단 이사장
            </p>
            <h4>Education</h4>
            <p>
              알토대학교 경제대학원 MBA
              <br />
              서울대학교 대학원 제약학 석사
              <br />
              서울대학교 제약학 학사
            </p>
          </div>

          <img
            src="/images/전승호.png"
            alt="전승호"
            height="300px"
            width="260px"
          />
        </StyledChairmanProfile>
        <br />
        <br />
        안녕하십니까?
        <br />
        <br />
        재단법인 미래의학연구재단은 미래의학생명과학을 선도할 뛰어난 아이디어와
        유망 기술의 최신동향을 적기에 공급하고 최신 치료기술을 효과적으로
        전파하여 세계적인 연구 및 창업생태계 조성과과 조기 기술실용화를 도모할
        목적으로 설립된 과학기술정보통신부 산하 비영리법인이며 중소벤처기업부
        등록 창업기획자입니다.
        <br />
        <br />
        재단에서 주도하는 모든 사업은 대한민국 연구자라면 누구나, 보다 쉽게
        기술실용화에 도전할 수 있는 민간형 비영리법인 창업지원 프로그램으로
        운영됩니다. 재단의 특허받은 UTO(Universal Tech Organizer)라는 공익적
        비즈니스 플랫폼을 기반으로 바이오산업 분야의 비영리법인으로써
        연구지원이나 싱크탱크에서 한걸음 더 나아간 공익적 플랫폼과
        엑셀러레이터로써 역할을 수행하여 유관분야의 우수 혁신 기술을 조기에
        발굴하고 집중 지원하여 재단 주도의 산ㆍ학ㆍ연 오픈이노베이션을 촉진하고
        초기 창업 기업의 리스크를 최소화하는데 도움을 주어 창업 성공율을
        높이는데 기여하겠습니다. <br />
        <br />
        재단은 MOU 체결한 협력기관과 상호협력을 통해 창업기업-산업계 간 혁신적
        비즈니스 네트워크를 꾸준히 지원하여 원천기술 보유자인 과학자들이 보다
        안심하고 기술 실용화에 도전할 수 있는 장이 될 것입니다. 더불어 재단의
        비영리법인 주도의 투자시스템을 통해 건전한 엔젤 투자 모델을 구축하고
        지속적인 유관산업 분야와 투자 매칭을 통한 후행투자 (Follow-on Fund)
        기회를 제공하여 대한민국 미래성장동력 발굴에 기여할 것입니다
        <br />
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
