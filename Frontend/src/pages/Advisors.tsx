import { useState } from 'react';
import { useQuery } from 'react-query';

import { getAdvisors } from '@/api';
import {
  Message,
  Portrait,
  PortraitWrapper,
} from '@/components/common';
import { Advisor } from '@/types';

export const Advisors = () => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);

  useQuery('advisors', () => getAdvisors(0, 10000), {
    retry: false,
    onSuccess: (res) => {
      setAdvisors(res.data.items);
    },
  });

  return (
    <>
      <h1>임원현황</h1>
      <Message>
        재단은 미래의학생명과학 분야를 타깃하여 혁신과 변화에 비전을
        둔 전문성과 다양성으로 스타트업 맞춤형 성장·지원을 통해
        산·학·연 오픈이노베이션을 촉진하고 건강한 창업생태계 구축에
        기여하겠습니다.
      </Message>

      {[
        '이사',
        '고문',
        '전문심의위원회',
        '자문위원회',
        'VC 자문단',
        '창업기획자 전문가그룹장',
        '창업기획자 전문가그룹 자문단',
        '칼럼니스트',
      ].map((type) => {
        return (
          <>
            <h1>{type}</h1>
            <PortraitWrapper>
              {advisors
                .filter((advisor) => advisor.type === type)
                .map((advisor) => {
                  return (
                    <Portrait
                      src={`upload/${advisor.filename}`}
                      name={advisor.name}
                      description={advisor.description.split('\n')}
                      key={advisor.id}
                    />
                  );
                })}
            </PortraitWrapper>
          </>
        );
      })}
    </>
  );
};
