import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlankDiv from "../../components/common/BlankDiv";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";

const StyledSponsorContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 30px;
`;

const SponsorPage = () => {
	const [sponsorshipStatus, setSponsorshipStatus] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/api/v1/file/banners", {
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
							link: "http://localhost:3000/introduction/founder",
							name: "김효수",
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
							name: "한미약품",
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
							name: "GENOSS.png",
							filename: "GENOSS.png",
							year: "",
						}}
					/>
					<SponsorItem
						item={{
							link: "http://www.dmgec.com",
							name: "대명GEC",
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
	padding: 25px;

	& span {
		font-size: 26px;
		color: #222;
		margin: 10px 0 20px;
		height: 22px;
	}

	& p {
		font-size: 17px;
		color: #be2526;
		font-weight: 500;
	}

	& h3 {
		font-weight: 600;
		padding: 10px 20px;
		background-color: #f7f7f7;
		background-color: #ffeb84;
		background-color: #c8deff;
		color: #224099;
		color: #000;
	}

	& a > div {
		border: 1px solid #e1e1e1;
		width: 200px;
		height: 110px;
		overflow: hidden;
	}

	& img {
		width: 200px;
		height: 110px;
		overflow: hidden;
	}
`;

const SponsorItem = ({ item }) => {
	return (
		<StyledSponsorItem>
			<a href={item.link} target="_blank" rel="noopener noreferrer">
				<div>
					<img
						src={`http://localhost:8000/api/v1/file/banner/${item.filename}`}
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
