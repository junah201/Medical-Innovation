import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

export const PortraitWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(5);

  const isFourBanner = useMediaQuery({
    minWidth: 180 * 4 + 20 + 1 + 300,
  });
  const isThreeBanner = useMediaQuery({
    minWidth: 180 * 3 + 20 + 1 + 300,
    maxWidth: 180 * 4 + 20 + 300,
  });
  const isTwoBanner = useMediaQuery({
    minWidth: 180 * 2 + 20 + 1 + 300,
    maxWidth: 180 * 3 + 20 + 300,
  });
  const isOneBanner = useMediaQuery({
    maxWidth: 180 * 2 + 20 + 300,
  });

  useEffect(() => {
    if (isFourBanner) {
      setCount(4);
    } else if (isThreeBanner) {
      setCount(3);
    } else if (isTwoBanner) {
      setCount(2);
    } else if (isOneBanner) {
      setCount(2);
    } else {
      setCount(4);
    }
  }, [isFourBanner, isThreeBanner, isTwoBanner, isOneBanner]);

  return (
    <StyledPortraitWrapper count={count}>{children}</StyledPortraitWrapper>
  );
};

const StyledPortraitWrapper = styled.div<{ count: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count || 5}, 1fr);
  grid-gap: 10px;
  padding: 40px;

  @media screen and (max-width: 991px) {
  }
  @media screen and (min-width: 992px) {
    grid-gap: 20px;
  }
`;
