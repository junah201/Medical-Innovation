import React, { useState } from "react";
import styled from "styled-components";

const StyledBanners = styled.div`
	background-color: #ffffff;
	display: grid;
	width: 1580px;
	grid-template-rows: repeat(2, 110px);
	grid-template-columns: repeat(10, 200px);
	grid-auto-flow: column;
	grid-gap: 30px;
	overflow: hidden;
	margin-right: ${(props) => props.marginLeft || "0"}px;
`;

const dumpData = [
	{
		name: "abbott",
		path: "/images/banner/Abbott.png",
		link: "https://www.abbott.com/",
	},
	{
		name: "bbraun",
		path: "/images/banner/B.Braun.png",
		link: "https://www.bbraun.com/",
	},
	{
		name: "gccorp",
		path: "/images/banner/GC녹십자.png",
		link: "http://www.gccorp.com/",
	},
	{
		name: "medtronic",
		path: "/images/banner/Medtronic.png",
		link: "https://europe.medtronic.com/",
	},
	{
		name: "microport",
		path: "/images/banner/MicroPort.png",
		link: "https://microport.com/",
	},
	{
		name: "organon",
		path: "/images/banner/Organon.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
	{
		name: "organon",
		path: "/images/banner/pfizer.png",
		link: "https://www.organon.com/",
	},
];

const Banners = () => {
	const [bannerIndex, setBannerIndex] = useState(0);

	console.log("재랜더링");

	const onNextClickHandler = () => {
		if (bannerIndex < dumpData.length / 2 - 1) {
			setBannerIndex(bannerIndex + 1);
		}
		console.log(bannerIndex);
	};

	return (
		<>
			<button onClick={onNextClickHandler}>다음</button>
			<StyledBanners marginLeft={bannerIndex * 210}>
				{dumpData.map((item, index) => {
					return (
						<a href={item.link} key={index}>
							<img
								width="200px"
								height="110px"
								src={item.path}
								alt={item.name}
							/>
						</a>
					);
				})}
			</StyledBanners>
		</>
	);
};

export default Banners;
