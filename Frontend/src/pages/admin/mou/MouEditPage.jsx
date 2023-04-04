import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "utils/const";
import { useParams, useNavigate } from "react-router-dom";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";

const MouEditPage = () => {
	const authCtx = useContext(AuthContext);
	const params = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [link, setLink] = useState("");

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/mou/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				setName(res.data.name);
				setLink(res.data.link);
				return;
			}
		});
	}, [params.id]);

	const onSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${API_URL}/api/v1/mou/update/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: {
				name: name,
				link: link,
			},
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/mou/all");
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			alert("수정에 실패했습니다.");
		});
	};

	return (
		<AdminPage>
			<h1>MOU 수정</h1>
			<Message>이미지 수정은 삭제 후 재업로드해주세요.</Message>
			<AdminForm onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="link"
					value={link}
					onChange={(e) => {
						setLink(e.target.value);
					}}
				/>
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default MouEditPage;
