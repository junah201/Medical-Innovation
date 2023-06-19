import styled from 'styled-components';

import { SubNavButton } from '@/components/nav';
import { ROUTE } from '@/constants';

interface SupportSubNavProps {
  select: string;
}

export const SupportSubNav = ({ select }: SupportSubNavProps) => {
  return (
    <Wrapper>
      <SubNavButton
        href={ROUTE.SUPPORT.SPONSORSHIP}
        text="후원하기"
        select={select === '후원하기'}
      />
      <SubNavButton
        href={ROUTE.SUPPORT.BENEFITS}
        text="후원자 혜택"
        select={select === '후원자 혜택'}
      />
      <SubNavButton
        href={ROUTE.SUPPORT.SPONSORS}
        text="후원자 소개"
        select={select === '후원자 소개'}
      />
      <SubNavButton
        href={ROUTE.SUPPORT.HISTORY}
        text="후원금 사용 내역"
        select={select === '후원금 사용 내역'}
      />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
