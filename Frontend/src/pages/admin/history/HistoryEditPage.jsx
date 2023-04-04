import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import AuthContext from "context/AuthContext";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import { API_URL } from "utils/const";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "static/css/content-styles.css";

const StyledPostEditPage = styled.div`
	display: flex;
	flex-direction: column;

	& .ck-editor {
		width: 800px;
	}

	& .ck-editor__editable_inline {
		min-height: 600px;
	}
`;

const HistoryEditPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const params = useParams();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/history/get/${params.id}`,
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				setTitle(res.data.title);
				setContent(res.data.content);
			}
		});
	}, [params.id, authCtx]);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios({
			url: `${API_URL}/api/v1/history/update/${params.id}`,
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: { title: title, content: content },
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/history/all");
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
			<StyledPostEditPage>
				<h1>연혁 수정</h1>
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
						data={content}
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
					<button type="submit">수정하기</button>
				</AdminForm>
			</StyledPostEditPage>
		</AdminPage>
	);
};

export default HistoryEditPage;
