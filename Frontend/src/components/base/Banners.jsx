import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const move = (x) => keyframes`
	100%{
		transform: translateX(-${x + 190}px);
	}
`;

const StyledBannerContainerWrapper = styled.div`
	width: 100vw;
	display: flex;
	justify-content: center;
	background-color: #ffffff;
`;

const StyledBannersContainer = styled.div`
	width: 1300px;
	overflow: hidden;
	background-color: #ffffff;
`;

const StyledBanners = styled.div`
	position: relative;
	background-color: #ffffff;
	display: grid;
	grid-template-rows: repeat(2, 88px);
	grid-template-columns: repeat(10, 160px);
	grid-auto-flow: column;
	padding: 30px 0;
	grid-gap: 30px;
	transform: translateX(-${(props) => props.x || 0}px);
	animation: ${(props) => move(props.x)} 5s;
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

const Banners = () => {
	const [banners, setBanners] = useState([]);
	const [bannerIndex, setBannerIndex] = useState(0);

	useEffect(() => {
		// 배너 이미지 요청
		fetch("http://localhost:8000/api/v1/file/banners", {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setBanners(data);
				});
			}
		});
	}, []);

	useEffect(() => {
		// 배너 움직임 설정
		const mover = setInterval(() => {
			setBannerIndex((bannerIndex) => {
				if (bannerIndex < banners.length / 2 - 8) {
					return bannerIndex + 1;
				} else {
					return 0;
				}
			});
		}, 6000);

		return () => clearInterval(mover);
	});

	return (
		<StyledBannerContainerWrapper>
			<StyledBannersContainer>
				<StyledBanners x={bannerIndex * 190}>
					{banners.map((item, index) => {
						return (
							<StyledBannerItem>
								<a
									href={item.link}
									key={item.id}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={`http://localhost:8000/api/v1/file/banner/${item.filename}`}
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

export default Banners;
