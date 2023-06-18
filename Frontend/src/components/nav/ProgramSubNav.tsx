import styled from 'styled-components';

import { SubNavButton } from '@/components/nav';

interface ProgramSubNavProps {
  select: string;
}

export const ProgramSubNav = ({ select }: ProgramSubNavProps) => {
  return (
    <Wrapper>
      <SubNavButton href="/programs/event" text="프로그램안내" select={select === '프로그램안내'} />
      <SubNavButton
        href="/programs/accelerating"
        text="스타트업지원"
        select={select === '스타트업지원'}
      />
      <SubNavButton
        href="/programs/research_support_project"
        text="학술연구지원"
        select={select === '연구발굴 지원사업'}
      />
      <SubNavButton
        href="/programs/trand"
        text="최신동향보고서"
        select={select === '최신동향보고서'}
      />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
