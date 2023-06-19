import styled from 'styled-components';

import { DEVICES, HEADER, FOOTER, BANNER } from '@/constants';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(/images/default_background.jpg);

  @media screen and (${DEVICES.MOBILE}) {
    padding: 10px 0;
    min-height: calc(
      100vh - ${HEADER.MOBILE_HEIGHT} - ${FOOTER.MOBILE_HEIGHT} -
        ${BANNER.MOBILE_HEIGHT}
    );
  }

  @media screen and (${DEVICES.DESKTOP}) {
    padding: 30px;
    min-height: calc(
      100vh - ${HEADER.DESKTOP_HEIGHT} - ${FOOTER.DESKTOP_HEIGHT} -
        ${BANNER.DESKTOP_HEIGHT}
    );
  }
`;

export const HomeWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};
