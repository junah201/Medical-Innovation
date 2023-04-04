import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";
import AuthContext from "context/AuthContext";
import AdminPage from "components/admin/AdminPage";
import AdminForm from "components/admin/AdminForm";
import { API_URL, CDN_URL } from "utils/const";

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

const PostEditPage = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const params = useParams();
	const [boards, setBoards] = useState([]);

	const [title, setTitle] = useState("");
	const [boardId, setBoardId] = useState(1);
	const [content, setContent] = useState("");

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

		fetch(`${API_URL}/api/v1/post/${params.id}`, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					setTitle(data.title);
					setBoardId(data.board_id);
					setContent(data.content);
				});
			}
		});
	}, [params.id, authCtx]);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${API_URL}/api/v1/post/${params.id}`, {
			method: "PUT",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			body: JSON.stringify({
				title: title,
				board_id: boardId,
				content: content,
			}),
		}).then((res) => {
			if (res.status === 204) {
				alert("수정되었습니다.");
				navigate("/admin/post/all", { replace: true });
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
									default: `${CDN_URL}/upload/${res.data.filename}`,
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
			<StyledPostEditPage>
				<h1>게시물 수정</h1>
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
						data={content}
						config={{
							extraPlugins: [uploadPlugin],
							mediaEmbed: {
								previewsInData: true,
							},
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
							console.log(data);
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

export default PostEditPage;
