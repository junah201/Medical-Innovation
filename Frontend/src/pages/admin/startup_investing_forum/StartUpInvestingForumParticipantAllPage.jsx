import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";

const StartUpInvestingForumParticipantAllPage = () => {
	const authCtx = useContext(AuthContext);

	const [participants, setParticipants] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/startup_investing_forum_participant/all?skip=${page}&limit=${SIZE}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setParticipants(res.data.participants);
			setTotal(res.data.total);
		});
	}, [authCtx, page]);

	return (
		<AdminPage>
			<h1>StartUp Investing Forum 참여자</h1>
			<Message>tip : ...</Message>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>성별</th>
						<th>생년월일</th>
						<th>전화번호</th>
						<th>이메일</th>
						<th>소속기관</th>
						<th>상세정보</th>
					</tr>
				</thead>
				<tbody>
					{participants.map((participant) => {
						return (
							<tr key={participant.id}>
								<td>{participant.id}</td>
								<td>{participant.name}</td>
								<td>{participant.gender}</td>
								<td>{participant.birth}</td>
								<td>{participant.phone}</td>
								<td>{participant.email}</td>
								<td>{participant.organization_name}</td>
								<td>
									<Link
										to={`/admin/startup_investing_forum_participant/detail/${participant.id}`}
									>
										상세정보
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default StartUpInvestingForumParticipantAllPage;
