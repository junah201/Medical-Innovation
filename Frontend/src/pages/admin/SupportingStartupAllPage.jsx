import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPage from "./../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { Link } from "react-router-dom";

import { API_URL } from "../../utils/const";
import LinkButton from "../../components/common/LinkButton";

const SupportingStartupAllPage = () => {
	const [supportingStartups, setSupportingStartups] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/supporting_startup/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setSupportingStartups(res.data.supporting_startups);
			setTotal(res.data.total);
		});
	}, [page]);

	return (
		<AdminPage>
			<h1>스타트업 지원</h1>
			<LinkButton to="/admin/supporting_startup/create" type="Link">
				스타트업 추가
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>회사명</th>
						<th>링크</th>
						<th>생성일</th>
						<th>수정일</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{supportingStartups.map((supporting_startup) => {
						return (
							<tr>
								<td>{supporting_startup.id}</td>
								<td>{supporting_startup.name}</td>
								<td>{supporting_startup.link}</td>
								<td>{supporting_startup.created_at.replace("T", " ")}</td>
								<td>{supporting_startup.updated_at.replace("T", " ")}</td>
								<td>
									<Link
										to={`/admin/supporting_startup/edit/${supporting_startup.id}`}
									>
										수정
									</Link>
								</td>
								<td>
									<Link
										to={`/admin/supporting_startup/delete/${supporting_startup.id}`}
									>
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

export default SupportingStartupAllPage;
