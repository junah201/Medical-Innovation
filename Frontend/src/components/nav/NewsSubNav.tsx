import styled from 'styled-components';

import { SubNavButton } from '@/components/nav';
import { ROUTE } from '@/constants';

interface NewsSubNavProps {
  select: string;
}

export const NewsSubNav = ({ select }: NewsSubNavProps) => {
  return (
    <Wrapper>
      <SubNavButton
        href={ROUTE.NEWS.ANNOUNCEMENT}
        text="공지사항"
        select={select === '공지사항'}
      />
      <SubNavButton
        href={ROUTE.NEWS.PRESS_RELEASE}
        text="보도자료"
        select={select === '보도자료'}
      />
      <SubNavButton
        href={ROUTE.NEWS.COLUMN}
        text="기고문"
        select={select === '기고문'}
      />
      <SubNavButton
        href={ROUTE.NEWS.PHOTH}
        text="사진"
        select={select === '사진'}
      />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
