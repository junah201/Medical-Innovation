import styled from 'styled-components';

import { SubNavButton } from '@/components/nav';

interface IntroductionSubNavProps {
  select: string;
}

export const IntroductionSubNav = ({ select }: IntroductionSubNavProps) => {
  return (
    <Wrapper>
      <SubNavButton
        href="/introduction/founder"
        text="설립자 소개"
        select={select === '설립자 소개'}
      />
      <SubNavButton
        href="/introduction/message"
        text="이사장 인사말"
        select={select === '이사장 인사말'}
      />
      <SubNavButton
        href="/introduction/mission_and_history"
        text="설립 취지 및 연혁"
        select={select === '설립 취지 및 연혁'}
      />
      <SubNavButton
        href="/introduction/orgchart_and_project"
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
