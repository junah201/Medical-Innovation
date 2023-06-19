import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { Banner } from '@/types';
const { VITE_CDN_URL } = import.meta.env;

export const MobileBanners = ({
  banners,
  count,
}: {
  banners: Banner[];
  count: number;
}) => {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const mover = setInterval(() => {
      setBannerIndex((bannerIndex) => {
        if (bannerIndex < banners.length / 2 - count * 2) {
          return bannerIndex + 1;
        } else {
          return 0;
        }
      });
    }, 5000);

    return () => clearInterval(mover);
  }, [banners, count]);

  return (
    <StyledBannerContainerWrapper>
      <StyledBannersContainer count={count}>
        <StyledBanners x={bannerIndex * 120}>
          {banners.map((item) => {
            return (
              <StyledBannerItem key={item.id}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={`${VITE_CDN_URL}/banner/${item.filename}`}
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

const move = (x: number) => keyframes`
	100%{
		transform: translateX(-${x + 120}px);
	}
`;

const StyledBannerContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff;
`;

const StyledBannersContainer = styled.div<{ count: number }>`
  width: 1300px;
  width: ${(props) => (props?.count ? props.count * 120 : 5 * 120)}px;
  overflow: hidden;
  background-color: #ffffff;
`;

const StyledBanners = styled.div<{ x: number }>`
  position: relative;
  background-color: #ffffff;
  display: grid;
  grid-template-rows: repeat(2, 55px);
  grid-template-columns: repeat(10, 100px);
  grid-auto-flow: column;
  padding: 20px 0;
  grid-gap: 20px;
  transform: translateX(-${(props) => props.x || 0}px);
  animation: ${(props) => move(props.x)} 3s;
  animation-delay: 1s;
`;

const StyledBannerItem = styled.div`
  overflow: hidden;
  border: 1px solid #e1e1e1;
  width: 100px;
  height: 55px;

  & a {
    box-sizing: content-box;
  }
  & img {
    width: 100px;
    height: 55px;
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
