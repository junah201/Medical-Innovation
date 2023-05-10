import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { API_URL, CDN_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";
import LinkButton from "components/common/LinkButton";

const PrivateEventsPage = () => {
	const authCtx = useContext(AuthContext);

	const [events, setEvents] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/private_event/all?skip=${page}&limit=${SIZE}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setEvents(res.data.events);
			setTotal(res.data.total);
		});
	}, [authCtx, page]);

	return (
		<AdminPage>
			<h1>로그인 필수 행사</h1>
			<Message>
				tip : 로그인 필수 행사 삭제 후 복구가 불가능하니 신중하게 결정해주세요.
			</Message>
			<LinkButton to="/admin/private_event/create" type="Link">
				행사 생성
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>이미지</th>
						<th>신청 시작일</th>
						<th>신청 종료일</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{events.map((event) => {
						return (
							<tr key={event.id}>
								<td>{event.id}</td>
								<td>{event.name}</td>
								<td>
									<a
										href={`${CDN_URL}/upload/${
											event.thumbnail_filename || "null.png"
										}`}
									>
										{event.thumbnail_filename || "null.png"}
									</a>
								</td>
								<td>{event.join_start_date}</td>
								<td>{event.join_end_date}</td>
								<td>
									<Link to={`/admin/private_event/edit/${event.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/private_event/delete/${event.id}`}>
										삭제
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

export default PrivateEventsPage;
