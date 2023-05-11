import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import AdminTable from "components/admin/AdminTable";
import { Link } from "react-router-dom";

const UserAllPage = () => {
	const authCtx = useContext(AuthContext);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/user/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setUsers(res.data.users);
			setTotal(res.data.total);
		});
	}, [authCtx, page]);

	const [users, setUsers] = useState([]);

	return (
		<AdminPage>
			<h1>회원목록</h1>
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>고유 id</th>
						<th>이름</th>
						<th>전화번호</th>
						<th>이메일</th>
						<th>생일</th>
						<th>이메일 허용</th>
						<th>계정 생성일</th>
						<th>심사 권한 수정</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.phone}</td>
								<td>{user.email}</td>
								<td>{user.birth}</td>
								<td>{`${user.email_enable}`}</td>
								<td>{user.created_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/uesr/${user.id}/permission/edit`}>
										심사 권한 수정
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

export default UserAllPage;
