import styled from 'styled-components';

import { DefaultWrapper } from '@/components/wrappers';
import { DEVICES, HEADER, FOOTER } from '@/constants';

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <DefaultWrapper>
      <Wrapper>{children}</Wrapper>
    </DefaultWrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1230px;
  height: 100%;
  min-height: calc(100vh - ${HEADER.MOBILE_HEIGHT} - ${FOOTER.MOBILE_HEIGHT});
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  @media screen and (${DEVICES.MOBILE}) {
    min-width: none;
    padding: 15px 15px;
  }
  @media screen and (${DEVICES.DESKTOP}) {
    max-width: 1230px;
    padding: 30px 80px;
  }
`;
