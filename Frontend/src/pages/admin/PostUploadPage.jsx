import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";

const StyledPostUploadPage = styled.div`
	display: flex;
	flex-direction: column;

	& * + * {
		margin-top: 10px;
	}

	& input,
	select {
		width: 800px;
		height: 30px;
		padding: 3px;
		font-size: 16px;
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
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		if (!authCtx.isLoggedIn) {
			alert("로그인이 필요한 서비스입니다.");
			navigate("/");
			return;
		}
		if (!authCtx.isAdmin) {
			alert("권한이 부족합니다.");
			navigate("/");
			return;
		}
	}, [navigate, authCtx]);

	const [boards, setBoards] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/api/v1/board/all`, {
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setBoards(data);
			});
	}, []);

	const [errorMessages, setErrorMessages] = useState(
		"tip : 파일 선택은 한번에 여러개 가능합니다."
	);

	const [title, setTitle] = useState("");
	const [boardId, setBoardId] = useState(1);
	const [content, setContent] = useState("");
	const [files, setFiles] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		let tmp = [];
		for (let i = 0; i < files.length; i++) {
			const formData = new FormData();
			formData.append("file", files[i]);
			tmp.push(
				axios.post(`${API_URL}/api/v1/file/upload`, formData, {
					headers: {
						accept: "application/json",
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${authCtx.accessToken}`,
					},
				})
			);
		}

		setErrorMessages(`파일 업로드 중...`);

		axios.all(tmp).then(
			axios.spread((...res) => {
				console.log(res);
				const file_names = [];
				if (!!res) {
					for (let i = 0; i < res.length; i++) {
						file_names.push(res[i].data.filenames);
					}
				}
				setErrorMessages(`게시물 업로드 중...`);
				axios({
					url: `${API_URL}/api/v1/post/create`,
					method: "POST",
					headers: {
						accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${authCtx.accessToken}`,
					},
					data: {
						title: title,
						board_id: parseInt(boardId),
						content: content,
						files: file_names,
					},
				}).then((res) => {
					if (res.status === 204) {
						setErrorMessages("게시물 업로드 성공");
						alert("게시물 업로드 성공");
						return;
					}
					setErrorMessages("게시물 업로드 실패");
					alert("게시물 업로드 실패");
				});
			})
		);
	};

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
					<textarea
						type="text"
						placeholder="Content"
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
					/>
					<input
						type="file"
						onChange={(e) => {
							setFiles(e.target.files);
						}}
						multiple
					/>
					<br />
					<br />
					<button type="submit">업로드</button>
				</form>
			</StyledPostUploadPage>
		</AdminPage>
	);
};

export default PostUploadPage;
