import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const move = (x) => keyframes`
	100%{
		transform: translateX(-${x + 120}px);
	}
`;

const StyledBannerContainerWrapper = styled.div`
	display: flex;
	justify-content: center;
	background-color: #ffffff;
`;

const StyledBannersContainer = styled.div`
	width: 1300px;
	width: calc(120px * 3);
	overflow: hidden;
	background-color: #ffffff;
`;

const StyledBanners = styled.div`
	position: relative;
	background-color: #ffffff;
	display: grid;
	grid-template-rows: repeat(2, 55px);
	grid-template-columns: repeat(10, 100px);
	grid-auto-flow: column;
	padding: 20px 0;
	grid-gap: 20px;
	transform: translateX(-${(props) => props.x || 0}px);
	animation: ${(props) => move(props.x)} 5s;
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

const MobileBanners = () => {
	const [banners, setBanners] = useState([]);
	const [bannerIndex, setBannerIndex] = useState(0);

	useEffect(() => {
		fetch(
			"https://azlbeqcjuzmdl6ysht4y7v44vm0tybim.lambda-url.ap-northeast-2.on.aws/api/v1/file/banners",
			{
				method: "GET",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setBanners(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	useEffect(() => {
		const mover = setInterval(() => {
			setBannerIndex((bannerIndex) => {
				if (bannerIndex < banners.length / 2 - 4) {
					return bannerIndex + 1;
				} else {
					return 0;
				}
			});
		}, 6000);

		return () => clearInterval(mover);
	}, [banners]);

	return (
		<StyledBannerContainerWrapper>
			<StyledBannersContainer>
				<StyledBanners x={bannerIndex * 120}>
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

export default MobileBanners;
