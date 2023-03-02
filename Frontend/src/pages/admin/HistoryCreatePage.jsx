import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminForm from "../../components/admin/AdminForm";
import { API_URL, S3_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";
import PostContent from "../../components/post/PostContent";
import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "../../static/css/content-styles.css";

const StyledPostUploadPage = styled.div`
	display: flex;
	flex-direction: column;

	& * + * {
		margin-top: 10px;
	}

	& form {
		display: flex;
		flex-direction: column;
	}

	& .ck-editor__editable_inline {
		min-height: 600px;
	}

	& input,
	select {
		width: 800px;
		height: 30px;
		padding: 3px;
		font-size: 16px;
	}

	& input[type="radio"] {
		width: 15px;
		height: 15px;
		padding: 0px;
	}

	& textarea {
		width: 800px;
		height: 400px;
		padding: 3px;
	}

	& button {
		padding: 10px 20px;
		font-size: 20px;
		font-weight: 600;
		margin: auto 0;
		background-color: #ffffff;
	}
`;

const HistoryCreatePage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [errorMessages, setErrorMessages] = useState("");

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("title", title);
		formData.append("content", content);

		axios({
			url: `${API_URL}/api/v1/history/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				setErrorMessages("연혁 생성 성공");
				alert("연혁 생성 성공");
				navigate(`/admin/history/all`);
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			setErrorMessages("연혁 생성 실패");
			alert("연혁 생성 실패");
		});
	};

	return (
		<AdminPage>
			<h1>연혁 생성</h1>
			<Message>{errorMessages}</Message>

			<AdminForm onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="제목"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<br />
				<CKEditor
					editor={ClassicEditor}
					data=""
					config={{
						mediaEmbed: {
							previewsInData: true,
						},
						toolbar: [],
					}}
					onReady={(editor) => {
						// You can store the "editor" and use when it is needed.
						console.log("Editor is ready to use!", editor);
					}}
					onChange={(event, editor) => {
						const data = editor.getData();
						setContent(data);
					}}
					onBlur={(event, editor) => {
						console.log("Blur.", editor);
					}}
					onFocus={(event, editor) => {
						console.log("Focus.", editor);
					}}
				/>
				<br />
				<button type="submit">업로드</button>
			</AdminForm>
			<br />
		</AdminPage>
	);
};

export default HistoryCreatePage;
