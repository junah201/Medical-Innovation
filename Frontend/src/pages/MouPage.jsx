import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Page from "../components/common/Page";
import Message from "./../components/common/Message";

const StyledMouContainer = styled.div`
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

const MouPage = () => {
	const [MoushipStatus, setMoushipStatus] = useState([]);

	useEffect(() => {
		fetch(
			"https://azlbeqcjuzmdl6ysht4y7v44vm0tybim.lambda-url.ap-northeast-2.on.aws/api/v1/file/mous",
			{
				method: "GET",
				headers: {
					accept: "application/json",
				},
			}
		).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setMoushipStatus(data);
				});
			}
		});
	}, []);

	return (
		<Page>
			<h1>MOU</h1>
			<Message>
				재단법인 미래의학연구재단과 MOU를 체결한 기관의 목록입니다.
			</Message>
			<StyledMouContainer>
				{MoushipStatus.map((item) => {
					return <MouItem item={item} key={item.id} />;
				})}
			</StyledMouContainer>
		</Page>
	);
};

const StyledMouItem = styled.div`
	border: 1px solid #e1e1e1;
	border-radius: 1px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	justify-items: center;
	align-items: center;
	padding: 25px;

	& span {
		font-size: 22px;
		color: #222;
		margin: 10px 0 20px;
		height: 22px;
		text-align: center;
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
			font-size: 18px;
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

const MouItem = ({ item }) => {
	return (
		<StyledMouItem>
			<a href={item.link} target="_blank" rel="noopener noreferrer">
				<div>
					<img
						src={`https://medical-innovation.s3.ap-northeast-2.amazonaws.com/mou/${item.filename}`}
						alt={item.filename}
					/>
				</div>
			</a>
			<span>{item.name}</span>
		</StyledMouItem>
	);
};

export default MouPage;
