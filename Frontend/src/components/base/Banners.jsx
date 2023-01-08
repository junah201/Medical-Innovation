import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const move = (x) => keyframes`
	100%{
		transform: translateX(-${x + 230}px);
	}
`;

const StyledBannerContainerWrapper = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	background-color: #ffffff;
`;

const StyledBannersContainer = styled.div`
	width: 1580px;
	height: 250px;
	overflow: hidden;
	background-color: #ffffff;
`;

const StyledBanners = styled.div`
	position: relative;
	background-color: #ffffff;
	display: grid;
	grid-template-rows: repeat(2, 110px);
	grid-template-columns: repeat(10, 200px);
	grid-auto-flow: column;
	grid-gap: 30px;
	transform: translateX(-${(props) => props.x || 0}px);
	animation: ${(props) => move(props.x)} 5s;
	animation-delay: 1s;
	& img {
		border: none;
		overflow: hidden;
	}
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
];

const Banners = () => {
	const [bannerIndex, setBannerIndex] = useState(0);

	useEffect(() => {
		const mover = setInterval(() => {
			if (bannerIndex < dumpData.length / 2 - 8) {
				setBannerIndex(bannerIndex + 1);
			} else {
				setBannerIndex(0);
			}
		}, 6000);

		return () => clearInterval(mover);
	});

	return (
		<StyledBannerContainerWrapper>
			<StyledBannersContainer>
				<StyledBanners x={bannerIndex * 230}>
					{dumpData.map((item, index) => {
						return (
							<a
								href={item.link}
								key={index}
								target="_blank"
								rel="noopener noreferrer"
							>
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
			</StyledBannersContainer>
		</StyledBannerContainerWrapper>
	);
};

export default Banners;
