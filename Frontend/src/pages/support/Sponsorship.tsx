import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SupportSubNav, Message } from '@/components';
import { ROUTE } from '@/constants';

export const Sponsorship = () => {
  return (
    <>
      <SupportSubNav select="후원하기" />
      <Message>
        <p>
          <span>
            대한민국 미래의학의 발전을 바라는 여러분 모두가 후원자가
            되어 주세요.
          </span>
        </p>
        <p>
          재단은 미래의학생명과학 분야의 사회일반의 이익을 목적으로
          설립된 과학기술정보통신부 산하 비영리법인이며
          기획재정부장관이 지정기부금단체로 지정·고시한
          공익법인입니다(지정기간 : 2022.02.02 ~ 2027.12.31).
        </p>
        <p>
          재단은 소외되기 쉬운 차세대 유망 연구자와 산업분야를 꾸준히
          지원합니다. 민간 비영리법인인 재단이 주도하는 산·학·연
          오픈이노베이션 플랫폼(UTO, Universal Tech Organizer. 특허 제
          10-2228853 호, 제 10-2354270 호, 특허-2022-0118011)을
          기반으로 우수 기술을 조기에 발굴하여 기술 사업화를 촉진하고
          바이오 스타트업 맞춤형 액셀러레이팅 프로그램을 제공합니다.
        </p>
        <p>
          이를 통해 재단은 기업의 지속 성장의 효율성을 극대화하고
          자본시장으로 이어주는 연결고리로써 꾸준히 지원하여 원천기술
          보유자인 과학자들이 보다 안심하고 기술 실용화에 도전할 수
          있는 장이 될 것입니다. 더불어 재단의 후원금을 창업기업에
          직접 투자하여 건전한 엔젤 투자 모형을 구축에 기여하고
          지속적인 유관산업 분야와 연구자 매칭을 통한
          후행투자(Follow-on Investment) 기회를 제공하여 대한민국
          미래성장동력 발굴에 기여할 것입니다.
        </p>
        <p>
          미래의학생명과학 분야의 발전을 위해 여러분의 연대가 우리의
          희망입니다. 우리는
          <strong>미래의학연구재단</strong>
          입니다.
        </p>
      </Message>
      <StyledSponsorshipContainer>
        <Link to={ROUTE.SUPPORT.APPLY}>기부하기</Link>
      </StyledSponsorshipContainer>
    </>
  );
};

const StyledSponsorshipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & a {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
    background-color: #fff;
    font-size: 26px;
  }
`;
