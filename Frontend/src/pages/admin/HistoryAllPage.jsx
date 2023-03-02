import React, { useState, useEffect } from "react";
import axios from "axios";

import AdminPage from "./../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { Link } from "react-router-dom";

import { API_URL } from "../../utils/const";
import LinkButton from "../../components/common/LinkButton";

const HistoryAllPage = () => {
	const [histories, setHistories] = useState([]);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/history/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setHistories(res.data.histories);
			setTotal(res.data.total);
			console.log(res.data.total);
		});
	}, [page]);

	return (
		<AdminPage>
			<h1>연혁</h1>
			<LinkButton to="/admin/history/create" type="Link">
				연혁 추가
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>생성일</th>
						<th>수정일</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{histories.map((history) => {
						return (
							<tr>
								<td>{history.id}</td>
								<td>{history.title}</td>
								<td>{history.created_at.replace("T", " ")}</td>
								<td>{history.updated_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/history/edit/${history.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/history/delete/${history.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default HistoryAllPage;
