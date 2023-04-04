import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";

import TextInfo from "components/info/TextInfo";

const PublicEventDetailPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();

	const [publicEvent, setPublicEvent] = useState(null);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/public_event/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setPublicEvent(res.data);
			console.log(res.data);
		});
	}, [authCtx, params.id]);

	return (
		<AdminPage>
			<h1>공개 행사 상세 정보</h1>
			<Message>
				tip : 공개 행사 삭제 후 복구가 불가능하니 신중하게 결정해주세요.
			</Message>
			{publicEvent && (
				<>
					<TextInfo title="이름" content={publicEvent.name} />
					<TextInfo title="이름 (영문)" content={publicEvent.english_name} />
					<TextInfo title="행사 설명" content={publicEvent.description} />
					<TextInfo title="행사 시작 날짜" content={publicEvent.start_date} />
					<TextInfo title="행사 종료 날짜" content={publicEvent.end_date} />
					<TextInfo
						title="참가 신청 시작 날짜"
						content={publicEvent.join_start_date}
					/>
					<TextInfo
						title="참가 신청 종료 날짜"
						content={publicEvent.join_end_date}
					/>
					<TextInfo
						title="생성 시점"
						content={publicEvent.created_at.replace("T", " ")}
					/>
					<TextInfo
						title="마지막 수정 시점"
						content={publicEvent.updated_at.replace("T", " ")}
					/>
				</>
			)}
		</AdminPage>
	);
};

export default PublicEventDetailPage;
