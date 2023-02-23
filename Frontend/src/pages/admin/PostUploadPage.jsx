import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
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

const PostUploadPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const [boards, setBoards] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/api/v1/board/all`, {
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setBoards(data);
			});
	}, [authCtx]);

	const [errorMessages, setErrorMessages] = useState(
		"tip : 파일 선택은 한번에 여러개 가능합니다. 이미지 첨부시에는 이미지를 선택한 후 업로드될 때 까지 잠깐 기다려주세요."
	);

	const [title, setTitle] = useState("");
	const [boardId, setBoardId] = useState(1);
	const [content, setContent] = useState("");
	const [files, setFiles] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i]);
		}

		formData.append("title", title);
		formData.append("board_id", boardId);
		formData.append("content", content);

		axios({
			url: `${API_URL}/api/v1/post/create`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			if (res.status === 204) {
				setErrorMessages("게시물 업로드 성공");
				alert("게시물 업로드 성공");
				navigate(`/admin/post/all`);
				return;
			}
			if (res.status === 401) {
				alert("로그인 후 이용해주세요.");
				navigate("/login");
				return;
			}
			setErrorMessages("게시물 업로드 실패");
			alert("게시물 업로드 실패");
		});
	};

	const customUploadAdapter = (loader) => {
		return {
			upload() {
				return new Promise((resolve, reject) => {
					const data = new FormData();
					loader.file.then((file) => {
						data.append("file", file);

						axios({
							url: `${API_URL}/api/v1/file/upload`,
							method: "POST",
							headers: {
								accept: "application/json",
								"Content-Type": "multipart/form-data",
								Authorization: `Bearer ${authCtx.accessToken}`,
							},
							data: data,
						})
							.then((res) => {
								resolve({
									default: `${S3_URL}/upload/${res.data.filename}`,
								});
							})
							.catch((err) => reject(err));
					});
				});
			},
		};
	};

	function uploadPlugin(editor) {
		editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
			return customUploadAdapter(loader);
		};
	}

	return (
		<AdminPage>
			<StyledPostUploadPage>
				<h1>게시물 업로드</h1>
				<Message>{errorMessages}</Message>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="제목"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
					<br />
					<select
						name="boardId"
						value={boardId}
						onChange={(e) => {
							setBoardId(e.target.value);
						}}
					>
						{boards.map((board) => {
							return (
								<option value={board.id} key={board.id}>
									{board.name}
								</option>
							);
						})}
					</select>
					<br />
					<CKEditor
						editor={ClassicEditor}
						data=""
						config={{
							extraPlugins: [uploadPlugin],
							heading: {
								options: [
									{
										model: "paragraph",
										view: "p",
										title: "본문",
										class: "ck-heading_paragraph",
									},
									{
										model: "heading1",
										view: "h1",
										title: "헤더1",
										class: "ck-heading_heading1",
									},
									{
										model: "heading2",
										view: "h2",
										title: "헤더2",
										class: "ck-heading_heading2",
									},
									{
										model: "heading3",
										view: "h3",
										title: "헤더3",
										class: "ck-heading_heading3",
									},
								],
							},
						}}
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log("Editor is ready to use!", editor);
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							console.log({ event, editor, data });
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
					<div>
						<label>하단 첨부파일 (한번에 여러개 선택)</label>
						<br />
						<input
							type="file"
							onChange={(e) => {
								setFiles(e.target.files);
							}}
							multiple
						/>
					</div>
					<br />
					<br />
					<button type="submit">업로드</button>
				</form>
			</StyledPostUploadPage>
			<br />
			<br />
			<br />
			<StyledPostUploadPage>
				<h1>게시물 미리보기</h1>
				<PostContent content={content} />
			</StyledPostUploadPage>
		</AdminPage>
	);
};

export default PostUploadPage;
