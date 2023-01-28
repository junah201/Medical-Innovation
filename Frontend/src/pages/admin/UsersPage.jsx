import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";

const UsersPage = () => {
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/user/all?skip=0&limit=1000`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setUsers(res.data);
		});
	}, [authCtx]);

	const [users, setUsers] = useState([]);

	console.log(users);

	return (
		<AdminPage>
			<h1>Users</h1>
			<StyledUserContainer>
				<>
					<StyledUserItem>고유 id</StyledUserItem>
					<StyledUserItem>이름</StyledUserItem>
					<StyledUserItem>전화번호</StyledUserItem>
					<StyledUserItem>이메일</StyledUserItem>
					<StyledUserItem>생일</StyledUserItem>
					<StyledUserItem>이메일 허용</StyledUserItem>
					<StyledUserItem>계정 생성일</StyledUserItem>
					<StyledUserItem>계정 업데이트</StyledUserItem>
				</>
				{users.map((user) => {
					return <UserItem user={user} key={user.id} />;
				})}
			</StyledUserContainer>
		</AdminPage>
	);
};

const StyledUserContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

	border-top: 2px solid silver;
	border-left: 2px solid silver;

	& > div {
		border-right: 2px solid silver;
		border-bottom: 2px solid silver;
	}
`;

const StyledUserItem = styled.div`
	text-align: center;
	padding: 5px;
`;

const UserItem = ({ user }) => {
	return (
		<>
			<StyledUserItem>{user.id}</StyledUserItem>
			<StyledUserItem>{user.name}</StyledUserItem>
			<StyledUserItem>{user.phone}</StyledUserItem>
			<StyledUserItem>{user.email}</StyledUserItem>
			<StyledUserItem>{user.birth}</StyledUserItem>
			<StyledUserItem>{user.email_enable === true}</StyledUserItem>
			<StyledUserItem>{user.created_at}</StyledUserItem>
			<StyledUserItem>{user.updated_at}</StyledUserItem>
		</>
	);
};

export default UsersPage;
