import styled from 'styled-components';

import { IntroductionSubNav } from '@/components';

export const OrgchartAndProject = () => {
  return (
    <>
      <IntroductionSubNav select="조직도 및 사업" />
      <StyledOrgchartWrapper>
        <h1>조직도</h1>
        <img src="/images/조직도.png" alt="조직도" />
      </StyledOrgchartWrapper>
      <StyledOrgchartWrapper>
        <h1>주요사업</h1>
        <img src="/images/주요사업.png" alt="조직도" />
        <img src="/images/창업기획자사업모델.png" alt="창업기획자사업모델" />
      </StyledOrgchartWrapper>
    </>
  );
};

const StyledOrgchartWrapper = styled.div`
  & img {
    width: 100%;
  }
`;
