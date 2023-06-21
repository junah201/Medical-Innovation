import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';

import { getActiveBanners } from '@/api';
import { MobileBanners, DesktopBanners } from '@/components/banner';
import { Banner as IBanner } from '@/types';

export const Banner = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);

  useQuery('banners', getActiveBanners, {
    retry: false,
    onSuccess: (res) => {
      setBanners(res.data);
    },
  });

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isSevenBanner = useMediaQuery({
    minWidth: 840 + 20 + 1,
    maxWidth: 991,
  });
  const isSixBanner = useMediaQuery({
    minWidth: 720 + 20 + 1,
    maxWidth: 840 + 20,
  });
  const isFiveBanner = useMediaQuery({
    minWidth: 600 + 20 + 1,
    maxWidth: 720 + 20,
  });
  const isFourBanner = useMediaQuery({
    minWidth: 480 + 20 + 1,
    maxWidth: 600 + 20,
  });
  const isThreeBanner = useMediaQuery({
    minWidth: 360 + 20 + 1,
    maxWidth: 480 + 20,
  });

  const [bannerCount, setBannerCount] = useState(7);

  useEffect(() => {
    if (isDesktop) {
      return setBannerCount(7);
    }
    if (isSevenBanner) {
      return setBannerCount(7);
    }
    if (isSixBanner) {
      return setBannerCount(6);
    }
    if (isFiveBanner) {
      return setBannerCount(5);
    }
    if (isFourBanner) {
      return setBannerCount(4);
    }
    if (isThreeBanner) {
      return setBannerCount(3);
    }
    return setBannerCount(7);
  }, [
    bannerCount,
    isDesktop,
    isSevenBanner,
    isSixBanner,
    isFiveBanner,
    isFourBanner,
    isThreeBanner,
  ]);

  if (isDesktop) return <DesktopBanners banners={banners} />;
  else return <MobileBanners count={bannerCount} banners={banners} />;
};
