import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import LinkButton from "./../../components/common/LinkButton";

const PublicEventsPage = () => {
	const authCtx = useContext(AuthContext);

	const [publicEvents, setPublicEvents] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/public_event/all?skip=${page}&limit=${SIZE}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setPublicEvents(res.data.events);
			setTotal(res.data.total);
		});
	}, [authCtx, page]);

	return (
		<AdminPage>
			<h1>공개 행사</h1>
			<LinkButton to="/admin/public_event/create" type="Link">
				공개 행사 생성
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>참가 신청 시작일</th>
						<th>참가 신청 마감일</th>
						<th>행사 시작일</th>
						<th>행사 종료일</th>
						<th>상세 정보</th>
					</tr>
				</thead>
				<tbody>
					{publicEvents.map((publicEvent) => {
						return (
							<tr key={publicEvent.id}>
								<td>{publicEvent.id}</td>
								<td>{publicEvent.name}</td>
								<td>{publicEvent.join_start_date}</td>
								<td>{publicEvent.join_end_date}</td>
								<td>{publicEvent.start_date}</td>
								<td>{publicEvent.end_date}</td>
								<td>
									<Link to={`/admin/public_event/detail/${publicEvent.id}`}>
										상세 정보
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

export default PublicEventsPage;
