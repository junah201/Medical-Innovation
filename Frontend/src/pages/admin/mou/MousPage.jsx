import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import Message from "components/common/Message";
import { API_URL } from "utils/const";
import LinkButton from "components/common/LinkButton";

const MousPage = () => {
	const [mous, setMous] = useState([]);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/mou/all`,
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then((res) => {
			setMous(res.data);
		});
	}, []);

	return (
		<AdminPage>
			<h1>Mou 목록</h1>
			<Message>
				<Link to="/mou">Mou 페이지</Link> 에 표시되는 MOU 목록입니다.
			</Message>
			<LinkButton to="/admin/mou/upload" type="Link">
				MOU 업로드
			</LinkButton>
			<br />
			<AdminTable>
				<thead>
					<tr>
						<th>번호</th>
						<th>이름</th>
						<th>링크</th>
						<th>생성 시간</th>
						<th>수정 시간</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{mous.map((mou) => {
						return (
							<tr>
								<td>{mou.id}</td>
								<td>{mou.name}</td>
								<td>{mou.link}</td>
								<td>{mou.created_at.replace("T", " ")}</td>
								<td>{mou.updated_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/mou/edit/${mou.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/mou/delete/${mou.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default MousPage;
