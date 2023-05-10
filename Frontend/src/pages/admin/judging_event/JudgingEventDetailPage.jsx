import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";

import TextInfo from "components/info/TextInfo";
import PostContent from "components/post/PostContent";

const JudgingEventDetailPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();

	const [judgingEvent, setJudgingEvent] = useState(null);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/judging_event/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setJudgingEvent(res.data);
			console.log(res.data);
		});
	}, [authCtx, params.id]);

	return (
		<AdminPage>
			<h1>공개 행사 상세 정보</h1>
			<Message>
				tip : 공개 행사 삭제 후 복구가 불가능하니 신중하게 결정해주세요.
			</Message>
			{judgingEvent && (
				<>
					<TextInfo title="이름" content={judgingEvent.name} />
					<TextInfo title="행사 설명" content="">
						<PostContent content={judgingEvent.description} />
					</TextInfo>
					<TextInfo
						title="참가 신청 시작 날짜"
						content={judgingEvent.join_start_date}
					/>
					<TextInfo
						title="참가 신청 종료 날짜"
						content={judgingEvent.join_end_date}
					/>
					<TextInfo
						title="1차 심사 시작 날짜"
						content={judgingEvent.judging_1st_start_date}
					/>
					<TextInfo
						title="1차 심사 종료 날짜"
						content={judgingEvent.judging_1st_end_date}
					/>
					<TextInfo
						title="2차 심사 시작 날짜"
						content={judgingEvent.judging_2nd_start_date}
					/>
					<TextInfo
						title="2차 심사 종료 날짜"
						content={judgingEvent.judging_2nd_end_date}
					/>
					<TextInfo
						title="생성 시점"
						content={judgingEvent.created_at.replace("T", " ")}
					/>
					<TextInfo
						title="마지막 수정 시점"
						content={judgingEvent.updated_at.replace("T", " ")}
					/>
				</>
			)}
		</AdminPage>
	);
};

export default JudgingEventDetailPage;
