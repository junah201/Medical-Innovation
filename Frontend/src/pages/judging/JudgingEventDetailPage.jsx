import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Page from "components/common/Page";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_URL, CDN_URL } from "utils/const";
import TextInfo from "components/info/TextInfo";
import PostContent from "components/post/PostContent";
import AuthContext from "context/AuthContext";

const JudgingEventDetailPage = () => {
	const params = useParams();
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const [eventDetail, setEventDetail] = useState({});

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/user/me`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				if (params.nth === "1" && res.data.first_judging_permission === true)
					return;
				if (params.nth === "2" && res.data.second_judging_permission === true)
					return;

				alert("심사 권한이 없습니다.");
				navigate(`/judging/result/${params.event_id}/all`);
			}
		});
	}, [authCtx.accessToken, params.event_id, params.nth, navigate]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/judging_event/get/${params.event_id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			setEventDetail(res.data);
		});
	}, [params.event_id]);

	return (
		<Page>
			<div>
				<h1>{eventDetail.name}</h1>
				<div
					style={{
						width: "100%",
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
			</div>
			<div>
				<TextInfo title="행사 설명" content="">
					<PostContent content={eventDetail.description} />
				</TextInfo>
				<TextInfo
					title="참가 신청 기간 (접수 기간)"
					content={`${eventDetail.join_start_date} ~ ${eventDetail.join_end_date}`}
				/>
				<StyledEventRegistButton
					to={`/judging/event/${params.event_id}/register`}
				>
					참가 신청하기
				</StyledEventRegistButton>
			</div>
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
	margin: 20px 0;
	border-radius: 10px;
	font-size: 1.2rem;
	font-weight: 700;
	text-decoration: none;
`;

export default JudgingEventDetailPage;
