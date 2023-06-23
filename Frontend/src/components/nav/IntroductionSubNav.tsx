import styled from 'styled-components';

import { SubNavButton } from '@/components/nav';
import { ROUTE } from '@/constants';

interface IntroductionSubNavProps {
  select: string;
}

export const IntroductionSubNav = ({
  select,
}: IntroductionSubNavProps) => {
  return (
    <Wrapper>
      <SubNavButton
        href={ROUTE.INTRODUCTION.FOUNDER}
        text="설립자 소개"
        select={select === '설립자 소개'}
      />
      <SubNavButton
        href={ROUTE.INTRODUCTION.MESSAGE}
        text="이사장 인사말"
        select={select === '이사장 인사말'}
      />
      <SubNavButton
        href={ROUTE.INTRODUCTION.MISSION_AND_HISTORY}
        text="설립 취지 및 연혁"
        select={select === '설립 취지 및 연혁'}
      />
      <SubNavButton
        href={ROUTE.INTRODUCTION.ORGCHART_AND_PROJECT}
        text="조직도 및 사업"
        select={select === '조직도 및 사업'}
      />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
