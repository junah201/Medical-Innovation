import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Page from "../../components/common/Page";
import SubNav from "../../components/support/SubNav";

const HistoryPage = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// 배너 이미지 요청
		fetch("http://localhost:8000/api/v1/post/1/all", {
			method: "GET",
			headers: {
				accept: "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setPosts(data.posts);
					console.log(data);
				});
			}
		});
	}, []);

	return (
		<Page>
			<SubNav select="후원금 사용 내역" />
			<h1>재정 보고</h1>
			<div>
				{posts.map((item, index) => {
					return <HistoryItem idx={index} item={item} />;
				})}
			</div>
		</Page>
	);
};

const StyledHistoryItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 0;

	&:hover {
		background-color: #f9f9f9;
	}
	&:hover a {
		text-decoration: underline;
	}

	& + & {
		border-top: 1px solid #ececec;
	}

	& > span {
		width: 10%;
		text-align: center;
		font-size: 16px;
		font-weight: 400;
		line-height: 22px;
	}

	& > div > span {
		font-size: 12px;
		display: block;
	}

	& a {
		color: #000000;
	}
`;

const StyledHistoryItemContent = styled.div`
	width: 73%;
	margin-right: 1%;
	display: flex;
	flex-direction: column;

	& > a {
		font-size: 16px;
		display: block;
	}
`;

const StyledHistoryItemButton = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid #ececec;
	width: 10%;
	padding: 5px;

	& a {
		font-size: 12px;
	}
`;

const HistoryItem = ({ idx, item }) => {
	const date = new Intl.DateTimeFormat("ko", {
		dateStyle: "long",
	}).format(new Date(item.created_at));

	return (
		<StyledHistoryItem>
			<span>{idx + 1}</span>
			<StyledHistoryItemContent>
				<a href={`http://localhost:3000/post/${item.id}`}>{item.title}</a>
				<span>게시일 {date}</span>
			</StyledHistoryItemContent>
			<StyledHistoryItemButton>
				<a
					href={`http://localhost:8000/api/v1/file/download/${item.files[0]}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					다운로드
				</a>
			</StyledHistoryItemButton>
		</StyledHistoryItem>
	);
};

export default HistoryPage;

/*
http://localhost:8000/api/v1/file/download/2021%EB%85%84%20%EC%97%B0%EA%B0%84%20%EA%B8%B0%EB%B6%80%EA%B8%88%20%EB%AA%A8%EA%B8%88%EC%95%A1%20%ED%99%9C%EC%9A%A9%EC%8B%A4%EC%A0%81%20%EB%AA%85%EC%84%B8%EC%84%9C.pdf
*/
