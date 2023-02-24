import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlankDiv from "../../components/common/BlankDiv";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";

import { API_URL } from "../../utils/const";

const StyledSponsorContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 30px;

	@media screen and (max-width: 991px) {
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 8px;
	}
	@media screen and (min-width: 450px) and (max-width: 991px) {
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 10px;
	}
	@media screen and (min-width: 992px) and (max-width: 1249px) {
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 30px;
	}
	@media screen and (min-width: 1250px) {
	}
`;

const SponsorPage = () => {
	const [sponsorshipStatus, setSponsorshipStatus] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/api/v1/sponsoring_company/all`, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setSponsorshipStatus(data);
				});
			}
		});
	}, []);

	return (
		<Page>
			<SubNav select="후원자 소개" />
			<div>
				<h1>설립에 도움을 주신 후원자</h1>
				<StyledSponsorContainer>
					<SponsorItem
						item={{
							link: "/introduction/founder",
							name: "김효수 교수",
							filename: "김효수.png",
							year: "",
						}}
					/>
					<SponsorItem
						item={{
							link: "https://www.yuhan.co.kr",
							name: "유한양행",
							filename: "유한양행.png",
							year: "",
						}}
					/>
					<SponsorItem
						item={{
							link: "https://www.hanmi.co.kr",
							name: "한미약품(주)",
							filename: "한미약품.png",
							year: "",
						}}
					/>
					<SponsorItem
						item={{
							link: "https://www.reyonpharm.co.kr/",
							name: "이연제약",
							filename: "이연제약.png",
							year: "",
						}}
					/>
					<SponsorItem
						item={{
							link: "http://www.genoss.com/",
							name: "(주)제노스",
							filename: "GENOSS.png",
							year: "",
						}}
					/>
					<SponsorItem
						item={{
							link: "http://www.dmgec.com",
							name: "대명지이씨(주)",
							filename: "대명GEC.png",
							year: "",
						}}
					/>
				</StyledSponsorContainer>
			</div>
			<BlankDiv height="50px" />
			<div>
				<h1>후원기업 리스트</h1>
				<StyledSponsorContainer>
					{sponsorshipStatus.map((item) => {
						return <SponsorItem item={item} key={item.id} />;
					})}
				</StyledSponsorContainer>
			</div>
		</Page>
	);
};

const StyledSponsorItem = styled.div`
	border: 1px solid #e1e1e1;
	border-radius: 1px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
	align-items: center;
	padding: 20px;

	& span {
		font-size: 18px;
		color: #222;
		margin: 10px 0 20px;
		height: 22px;
	}

	& p {
		font-size: 17px;
		color: #be2526;
		font-weight: 500;
	}

	& a > div {
		border: 1px solid #e1e1e1;
		max-width: 200px;
		max-height: 110px;
		overflow: hidden;
	}

	& img {
		max-width: 200px;
		max-height: 110px;
		overflow: hidden;
	}

	& img:hover {
		transform: scale(1.2);
		transition: transform 0.5s;
	}

	@media screen and (max-width: 991px) {
		padding: 10px;

		& p {
			font-size: 12px;
			color: #be2526;
			font-weight: 500;
		}

		& span {
			font-size: 16px;
			text-align: center;
			color: #222;
			margin: 10px 0 10px;
			height: 22px;
		}

		& a > div {
			border: 1px solid #e1e1e1;
			width: 90px;
			height: 55px;
			overflow: hidden;
		}

		& img {
			width: 90px;
			height: 44px;
			overflow: hidden;
			object-fit: cover;
		}
	}
	@media screen and (min-width: 992px) {
	}
`;

const SponsorItem = ({ item }) => {
	return (
		<StyledSponsorItem>
			<a href={item.link} target="_blank" rel="noopener noreferrer">
				<div>
					<img
						src={`https://medical-innovation.s3.ap-northeast-2.amazonaws.com/banner/${item.filename}`}
						alt={item.filename}
					/>
				</div>
			</a>
			<span>{item.name}</span>
			<p>{item.year}</p>
		</StyledSponsorItem>
	);
};

export default SponsorPage;
