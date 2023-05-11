import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Page from "components/common/Page";
import Message from "components/common/Message";
import AdminTable from "./../../components/admin/AdminTable";
import {
	GrayStatusButton,
	GreenStatusButton,
} from "components/common/StatusButtons";

const JudgingParticipantAllPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const [eventDetail, setEventDetail] = useState({});
	const [participants, setParticipants] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_event/get/${params.event_id}`,
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setEventDetail(res.data);
				return;
			}
		});
	}, []);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${API_URL}/api/v1/judging_participant/${params.event_id}/all`,
			params: {
				limit: SIZE,
				skip: page,
			},
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					setParticipants(res.data.participants);
					setTotal(res.data.total);
					return;
				}
			})
			.catch((err) => {
				console.log(err);
				alert("참가자 목록을 불러오는데 실패했습니다.\n\n" + err);
			});
	}, [page, total]);

	return (
		<Page isLoginRequire={true}>
			<h1>{eventDetail.name || "로딩 중"}</h1>
			<Message>
				<div
					dangerouslySetInnerHTML={{
						__html: eventDetail.description || "로딩중",
					}}
				></div>
			</Message>
			<h1>심사 목록</h1>
			<AdminTable page={page} setPage={setPage} total={total} size={SIZE}>
				<thead>
					<tr>
						<th>이름</th>
						<th>이메일</th>
						<th>소속</th>
						<th>직위</th>
						<th>1차 심사 여부</th>
						<th>1차 심사</th>
						<th>2차 심사 여부</th>
						<th>2차 심사</th>
					</tr>
				</thead>
				<tbody>
					{participants.map((participant) => {
						return (
							<tr>
								<td>{participant.name}</td>
								<td>{participant.email}</td>
								<td>{participant.organization_name}</td>
								<td>{participant.job_position}</td>
								{!!participant.first_judging_result ? (
									<td>
										<GreenStatusButton>
											심사 완료 ({participant.first_judging_result.total_score}
											점)
										</GreenStatusButton>
									</td>
								) : (
									<td>
										<GrayStatusButton>미심사</GrayStatusButton>
									</td>
								)}
								<td>
									<Link
										to={`/judging/result/${params.event_id}/${participant.id}/1/create`}
									>
										심사하기
									</Link>
								</td>
								<td>
									{!!participant.second_judging_result ? (
										<GreenStatusButton>
											심사 완료 ({participant.second_judging_result.total_score}
											점)
										</GreenStatusButton>
									) : (
										<GrayStatusButton>미심사</GrayStatusButton>
									)}
								</td>
								<td>
									<Link
										to={`/judging/result/${params.event_id}/${participant.id}/2/create`}
									>
										심사하기
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</Page>
	);
};

export default JudgingParticipantAllPage;
