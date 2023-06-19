import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { getJudgingEvents } from '@/api';
import { Events, Message, ProgramSubNav } from '@/components';
import { JudgingEventList } from '@/types';

const SyledBioVentureCompetitionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 30px;
`;

export const Accelerating = () => {
  const [events, setEvents] = useState<JudgingEventList>();

  useQuery({
    queryKey: 'judging_events',
    queryFn: () => getJudgingEvents(0, 10000),
    onSuccess: (res: AxiosResponse) => {
      setEvents(res.data);
    },
  });

  return (
    <>
      <ProgramSubNav select="스타트업지원" />
      <div>
        <h1>연구자 중심 창업지원</h1>
        <Message>
          재단은 2022년 중소벤처기업부 창업기획자 비영리법인으로 등록된 공익적
          목적의 연구자 중심 창업 지원 플랫폼입니다. 신치료기술 개발의 위험성과
          장기화된 과정을 고려하여 지속적인 지원을 통해 차세대 인재들의 우수한
          혁신기술이 조기에 상용화될 수 있도록 꾸준히 노력하고 있습니다. 재단
          주도의 인적·물적 네트워크를 활용하여 기술 맞춤형 액셀러레이팅 프로그램
          및 선순환 오픈이노베이션을 지원합니다. 이를 통해 창업 기업의 지속적인
          성장을 촉진하고 신치료기술 분야에서의 혁신과 발전에 기여하고자 합니다.
        </Message>
      </div>
      <div>
        <h1>창업지원 사업목록</h1>
        {events && (
          <Events
            events={events.events}
            itemToLink={(item) => {
              return `/judging/event/${item.id}/detail`;
            }}
          />
        )}
      </div>
      <div>
        <h1>FMI's Biohealth Innovation Competition</h1>
        <SyledBioVentureCompetitionContainer>
          <WinnerItem
            year="2022"
            awardType="최우수상"
            winnerName="김희승 대표이사"
            winnerDetail="㈜드림팩"
          />
          <WinnerItem
            year="2022"
            awardType="우수상"
            winnerName="윤성준 대표"
            winnerDetail="㈜포투가 바이오"
          />
          <WinnerItem
            year="2022"
            awardType="장려상"
            winnerName="이인희 대표"
            winnerDetail="㈜핏미"
          />
          <WinnerItem
            year="2021"
            awardType="최우수상"
            winnerName="서영민 대표이사"
            winnerDetail="㈜오아이디"
          />
          <WinnerItem
            year="2021"
            awardType="우수상"
            winnerName="이규언 교수"
            winnerDetail="서울대학교병원"
          />
          <WinnerItem
            year="2021"
            awardType="장려상"
            winnerName="최종빈 박사과정생"
            winnerDetail="한국과학기술원"
          />
          <WinnerItem
            year="2020"
            awardType="최우수상"
            winnerName="김범수 연구교수"
            winnerDetail="(주)셀코"
          />
          <WinnerItem
            year="2020"
            awardType="우수상"
            winnerName="장현덕 교수"
            winnerDetail="서울대학교병원 의생명연구원"
          />
          <WinnerItem
            year="2020"
            awardType="장려상"
            winnerName="박주찬 박사과정생"
            winnerDetail="서울대학교 약학대학"
          />
        </SyledBioVentureCompetitionContainer>
      </div>
    </>
  );
};

const StyledWinnerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #e5e5e5;

  padding: 10px;

  & > div {
    overflow: hidden;
    width: 200px;
    height: 150px;
    border: 1px solid #e5e5e5;
  }

  & img {
    width: 200px;
    height: 150px;
  }

  & img:hover {
    transform: scale(1.2);
    transition: transform 0.5s;
  }

  & h6 {
    margin: 5px 0;
    font-size: 18px;
    font-weight: 600;
  }

  & p {
    margin: 5px 0;
    font-size: 14px;
  }

  & span {
    margin: 5px 0;
    font-size: 20px;
    font-weight: 600;
    color: #ff6b6b;
  }
`;

interface WinnerItemProps {
  year: string;
  awardType: string;
  winnerName: string;
  winnerDetail: string;
}

const WinnerItem = ({
  year,
  awardType,
  winnerName,
  winnerDetail,
}: WinnerItemProps) => {
  return (
    <StyledWinnerItem>
      <div>
        <img
          src={`/images/BioVentureCompetition/${year} ${awardType}.jpg`}
          alt={winnerName}
        />
      </div>
      <h6>{winnerName}</h6>
      <p>{winnerDetail}</p>
      <span>
        {year} {awardType}
      </span>
    </StyledWinnerItem>
  );
};
