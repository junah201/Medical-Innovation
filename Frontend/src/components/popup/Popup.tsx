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
}

export const Popup = ({
  title,
  image_filename,
  link,
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
      <StyledPopupView isDesktop={isDesktop}>
        <StyledPopupTitle isDesktop={isDesktop}>
          {title}
        </StyledPopupTitle>
        <br />
        <StyledPopupContent>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img
              src={`${VITE_CDN_URL}/upload/${image_filename}`}
              alt={image_filename}
            ></img>
          </a>
        </StyledPopupContent>
        <StyledCloseButton
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

const StyledPopupView = styled.div<{ isDesktop: boolean }>`
  position: fixed;
  top: ${(props) => (props.isDesktop ? '120px' : '20%')};
  right: ${(props) => (props.isDesktop ? '100px' : '5%')};
  width: ${(props) => (props.isDesktop ? '600px' : '90%')};
  background-color: rgba(255, 255, 255);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 3px;
  border: 1px solid black;
`;

const StyledPopupTitle = styled.h1<{ isDesktop: boolean }>`
  font-size: ${(props) => (props.isDesktop ? '30px' : '25px')};
  text-align: center;
  word-break: keep-all;
`;

const StyledPopupContent = styled.div`
  margin: 0;
  padding: 0%;

  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledCloseButton = styled.button`
  border: none;
  width: 100%;
  padding: 10px;
  background-color: #dedede;
  color: black;
  font-size: 20px;
  font-weight: bold;
`;
