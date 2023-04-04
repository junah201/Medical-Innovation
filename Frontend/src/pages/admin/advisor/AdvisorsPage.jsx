import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { Link } from "react-router-dom";

import { API_URL, CDN_URL } from "utils/const";
import LinkButton from "components/common/LinkButton";

const AdvisorsPage = () => {
	const [advisors, setAdvisors] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/advisor/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setAdvisors(res.data.advisors);
			setTotal(res.data.total);
		});
	}, [page]);

	return (
		<AdminPage>
			<h1>자문단 목록</h1>
			<LinkButton to="/admin/advisor/upload" type="Link">
				자문단 업로드
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>자문단 종류</th>
						<th>이미지</th>
						<th>생성일</th>
						<th>수정일</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{advisors.map((advisor) => {
						return (
							<tr>
								<td>{advisor.id}</td>
								<td>{advisor.name}</td>
								<td>{advisor.type}</td>
								<td>
									<a href={`${CDN_URL}/upload/${advisor.filename}`}>
										{advisor.filename}
									</a>
								</td>
								<td>{advisor.created_at.replace("T", " ")}</td>
								<td>{advisor.updated_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/advisor/edit/${advisor.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/advisor/delete/${advisor.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default AdvisorsPage;
