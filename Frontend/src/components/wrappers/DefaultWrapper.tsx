import styled from 'styled-components';

import { DEVICES, HEADER, FOOTER } from '@/constants';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5ecf4;
  background-image: url(/images/default_background.jpg);

  @media screen and (${DEVICES.MOBILE}) {
    padding: 15px;
    min-height: calc(100vh - ${HEADER.MOBILE_HEIGHT} - ${FOOTER.MOBILE_HEIGHT});
  }

  @media screen and (${DEVICES.DESKTOP}) {
    padding: 20px;
    min-height: calc(100vh - ${HEADER.DESKTOP_HEIGHT} - ${FOOTER.DESKTOP_HEIGHT});
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: 30px;
    border-left: 5px solid #204397;
    padding-left: 10px;
    margin-bottom: 20px;
  }

  @media screen and (${DEVICES.MOBILE}) {
    min-width: none;
    padding: 15px 15px;
  }
  @media screen and (${DEVICES.DESKTOP}) {
    max-width: 1230px;
    padding: 30px 80px;
  }
`;

export const DefaultWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
