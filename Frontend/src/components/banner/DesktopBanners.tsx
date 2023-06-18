import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Banner } from '@/types';

const move = (x: number) => keyframes`
	100%{
		transform: translateX(-${x + 190}px);
	}
`;

const StyledBannerContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
`;

const StyledBannersContainer = styled.div`
  width: 1300px;
  overflow: hidden;
  background-color: #ffffff;
`;

const StyledBanners = styled.div<{ x: number }>`
  position: relative;
  background-color: #ffffff;
  display: grid;
  grid-template-rows: repeat(1, 88px);
  grid-template-columns: repeat(10, 160px);
  grid-auto-flow: column;
  padding: 30px 0;
  grid-gap: 30px;
  transform: translateX(-${(props) => props.x || 0}px);
  animation: ${(props) => move(props.x)} 3s;
  animation-delay: 1s;
`;

const StyledBannerItem = styled.div`
  overflow: hidden;
  border: 1px solid #e1e1e1;
  width: 160px;
  height: 88px;

  & a {
    box-sizing: content-box;
  }
  & img {
    width: 160px;
    height: 88px;
    object-fit: cover;
    border: none;
    overflow: hidden;
  }

  &:hover {
    border: 2px solid #2763ba;
  }
  &:hover img {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

export const DesktopBanners = ({ banners }: { banners: Banner[] }) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const mover = setInterval(() => {
      setBannerIndex((bannerIndex) => {
        if (bannerIndex < banners.length - 8) {
          return bannerIndex + 1;
        } else {
          return 0;
        }
      });
    }, 4000);

    return () => clearInterval(mover);
  }, [banners]);

  return (
    <StyledBannerContainerWrapper>
      <StyledBannersContainer>
        <StyledBanners x={bannerIndex * 190}>
          {banners.map((item) => {
            return (
              <StyledBannerItem key={item.id}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`https://medical-innovation.s3.ap-northeast-2.amazonaws.com/banner/${item.filename}`}
                    alt={item.name}
                  />
                </a>
              </StyledBannerItem>
            );
          })}
        </StyledBanners>
      </StyledBannersContainer>
    </StyledBannerContainerWrapper>
  );
};
