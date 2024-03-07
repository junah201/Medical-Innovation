import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { COOKIE } from '@/constants';
import { setCookie, getCookie } from '@/libs/Cookie';

const { VITE_CDN_URL } = import.meta.env;

interface PopupProps {
  title: string;
  image_filename: string;
  link: string;
  idx: number;
}

export const Popup = ({
  title,
  image_filename,
  link,
  idx,
}: PopupProps) => {
  const [show, setShow] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    setShow(!getCookie(COOKIE.KEY.CLOSE_POPUP));
  }, []);

  if (!show) {
    return null;
  }

  return (
    <>
      <StyledPopupView isDesktop={isDesktop} index={idx}>
        <StyledPopupTitle isDesktop={isDesktop}>
          {title}
        </StyledPopupTitle>
        <StyledPopupContent isDesktop={isDesktop}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              src={`${VITE_CDN_URL}/upload/${image_filename}`}
              alt={image_filename}
            />
          </a>
        </StyledPopupContent>
        <StyledCloseButton
          isDesktop={isDesktop}
          onClick={() => {
            setShow(false);
            setCookie('closePopup', '1', {
              path: '/',
              expires: new Date(Date.now() + 60 * 60 * 24),
              maxAge: 60 * 24,
            });
          }}
        >
          닫기
        </StyledCloseButton>
      </StyledPopupView>
    </>
  );
};

const StyledPopupView = styled.div<{
  isDesktop: boolean;
  index: number;
}>`
  position: fixed;
  top: ${(props) => (props.isDesktop ? '100px' : '20%')};
  right: ${(props) =>
    props.isDesktop
      ? `${100 + 50 * props.index}px`
      : `${5 + 10 * props.index}%`};
  width: ${(props) => (props.isDesktop ? '500px' : '80%')};
  background-color: rgba(255, 255, 255);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid black;
`;

const StyledPopupTitle = styled.h1<{ isDesktop: boolean }>`
  font-size: ${(props) => (props.isDesktop ? '30px' : '18px')};
  text-align: center;
  word-break: keep-all;
  margin-bottom: 5px;
`;

const StyledPopupContent = styled.div<{ isDesktop: boolean }>`
  margin: 0;
  padding: 0%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledCloseButton = styled.button<{ isDesktop: boolean }>`
  border: none;
  width: 100%;
  padding: ${(props) => (props.isDesktop ? '8px' : '4px')};
  background-color: #dedede;
  color: black;
  font-size: ${(props) => (props.isDesktop ? '18px' : '16px')};
  font-weight: bold;
  cursor: pointer;
`;
