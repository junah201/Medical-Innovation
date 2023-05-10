import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Page from "components/common/Page";
import { Link, useParams } from "react-router-dom";
import { API_URL, CDN_URL } from "utils/const";
import TextInfo from "components/info/TextInfo";

const EventDetailPage = () => {
	const params = useParams();

	const [eventDetail, setEventDetail] = useState({});

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/public_event/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			setEventDetail(res.data);
		});
	}, [params.id]);

	return (
		<Page>
			<h1>{eventDetail.name}</h1>
			<div
				style={{
					width: "80%",
				}}
			>
				<img
					style={{
						width: "100%",
						overflow: "hidden",
					}}
					src={`${CDN_URL}/upload/${
						eventDetail.thumbnail_filename
							? eventDetail.thumbnail_filename
							: "null.png"
					}`}
					alt={eventDetail.name}
				/>
			</div>
			<TextInfo title="이름" content={eventDetail.name} />
			<TextInfo title="이름 (영문)" content={eventDetail.english_name} />
			<TextInfo title="행사 설명" content={eventDetail.description} />
			<TextInfo title="행사 시작 날짜" content={eventDetail.start_date} />
			<TextInfo title="행사 종료 날짜" content={eventDetail.end_date} />
			<TextInfo
				title="참가 신청 시작 날짜"
				content={eventDetail.join_start_date}
			/>
			<TextInfo
				title="참가 신청 종료 날짜"
				content={eventDetail.join_end_date}
			/>
			<StyledEventRegistButton to={`/programs/event/${params.id}/registration`}>
				참가 신청하기
			</StyledEventRegistButton>
		</Page>
	);
};

const StyledEventRegistButton = styled(Link)`
	display: block;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background-color: #fff;
	border: 1px solid #000;
	margin: 50px 0;
	border-radius: 10px;
	font-size: 1.2rem;
	font-weight: 700;
	text-decoration: none;
`;

export default EventDetailPage;
