import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";

const SupportingStartupCreatePage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [errorMessages, setErrorMessages] = useState("");

	const [name, setName] = useState("");
	const [content, setContent] = useState("");
	const [link, setLink] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("name", name);
		formData.append("content", content);
		formData.append("link", link);

		axios({
			url: `${API_URL}/api/v1/supporting_startup/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				setErrorMessages("스타트업 생성 성공");
				alert("스타트업 생성 성공");
				navigate(`/admin/supporting_startup/all`);
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			setErrorMessages("스타트업 지원 생성 실패");
			alert("스타트업 지원 생성 실패");
		});
	};

	return (
		<AdminPage>
			<h1>스타트업 지원 생성</h1>
			<Message>{errorMessages}</Message>

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
				<button type="submit">업로드</button>
			</AdminForm>
			<br />
		</AdminPage>
	);
};

export default SupportingStartupCreatePage;
