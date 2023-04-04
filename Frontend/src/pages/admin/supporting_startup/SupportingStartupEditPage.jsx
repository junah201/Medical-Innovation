import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import AuthContext from "context/AuthContext";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import { API_URL } from "utils/const";

const SupportingStartupEditPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const params = useParams();

	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [link, setLink] = useState("");

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/supporting_startup/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setName(res.data.name);
				setContent(res.data.content);
				setLink(res.data.link);
			}
		});
	}, [params.id, authCtx]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios({
			url: `${API_URL}/api/v1/supporting_startup/update/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: { title: name, content: content, link: link },
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/supporting_startup/all");
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
			<h1>스타트업 지원 수정</h1>
			<AdminForm onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="회사명"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<br />
				<input
					type="text"
					placeholder="링크"
					value={link}
					onChange={(e) => {
						setLink(e.target.value);
					}}
				/>
				<br />
				<textarea
					type="text"
					placeholder="스타트업에 대한 설명을 적어주세요."
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
				<br />
				<button type="submit">수정하기</button>
			</AdminForm>
		</AdminPage>
	);
};

export default SupportingStartupEditPage;
