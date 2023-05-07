import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import LinkButton from "components/common/LinkButton";
import { CDN_URL } from "utils//const";

const JudgingEventAllPage = () => {
	const authCtx = useContext(AuthContext);

	const [judgingEvents, setjudgingEvents] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/judging_event/all?skip=${page}&limit=${SIZE}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setjudgingEvents(res.data.events);
			setTotal(res.data.total);
		});
	}, [authCtx, page]);

	return (
		<AdminPage>
			<h1>심사 행사</h1>
			<LinkButton to="/admin/judging_event/create" type="Link">
				심사 행사 생성
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>이미지</th>
						<th>참가 신청 시작일</th>
						<th>참가 신청 마감일</th>
						<th>1차 심사 시작일</th>
						<th>1차 심사 종료일</th>
						<th>2차 심사 시작일</th>
						<th>2차 심사 종료일</th>
						<th>상세 정보</th>
						<th>수정</th>
					</tr>
				</thead>
				<tbody>
					{judgingEvents.map((judgingEvent) => {
						return (
							<tr key={judgingEvent.id}>
								<td>{judgingEvent.id}</td>
								<td>{judgingEvent.name}</td>
								<td>
									<a
										href={`${CDN_URL}/upload/${
											judgingEvent.thumbnail_filename || "null.png"
										}`}
									>
										{judgingEvent.thumbnail_filename || "null.png"}
									</a>
								</td>
								<td>{judgingEvent.join_start_date}</td>
								<td>{judgingEvent.join_end_date}</td>
								<td>{judgingEvent.judging_1st_start_date}</td>
								<td>{judgingEvent.judging_1st_end_date}</td>
								<td>{judgingEvent.judging_2nd_start_date}</td>
								<td>{judgingEvent.judging_2nd_end_date}</td>
								<td>
									<Link to={`/admin/judging_event/detail/${judgingEvent.id}`}>
										상세 정보
									</Link>
								</td>
								<td>
									<Link to={`/admin/judging_event/edit/${judgingEvent.id}`}>
										수정
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

export default JudgingEventAllPage;
