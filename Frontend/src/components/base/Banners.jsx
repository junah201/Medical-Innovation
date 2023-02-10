import React, { useState, useEffect } from "react";

import BigBanners from "../banners/BigBanners";
import SmallBanners from "../banners/SmallBanner";

import { useMediaQuery } from "react-responsive";

import { API_URL } from "../../utils/const";

const Banners = () => {
	const [banners, setBanners] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/api/v1/file/banners`, {
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setBanners(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

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

	return (
		<>
			{isDesktop ? (
				<BigBanners banners={banners} />
			) : (
				<SmallBanners count={bannerCount} banners={banners} />
			)}
		</>
	);
};

export default Banners;
