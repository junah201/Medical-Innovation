import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";
import { useNavigate } from "react-router-dom";
import BlankDiv from "./../../components/common/BlankDiv";
import "./../PostPage.css";

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
		padding: 0;
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
	const [imgSize, setImgSize] = useState("30%");
	const [imgSort, setImgSort] = useState("center");

	const handleImgaeUpload = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("file", e.target.files[0]);

		axios({
			url: `${API_URL}/api/v1/file/upload`,
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
			data: formData,
		}).then((res) => {
			setContent((prev) => {
				return `${prev}\n\n<div class="img-container ${imgSort}"><img width = ${imgSize} src="https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/${res.data.filenames}" /></div>\n\n`;
			});
		});
	};

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
						navigate(`/admin/post/all`);
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
					<div>
						<label>이미지 첨부</label>
						<br />
						<label>이미지 크기</label>{" "}
						<input
							type="radio"
							name="imgSize"
							value="30%"
							checked={imgSize === "30%"}
							onChange={() => setImgSize("30%")}
						/>
						작음
						<input
							type="radio"
							name="imgSize"
							value="50%"
							checked={imgSize === "50%"}
							onChange={() => setImgSize("50%")}
						/>
						중간
						<input
							type="radio"
							name="imgSize"
							value="100%"
							checked={imgSize === "100%"}
							onChange={() => setImgSize("100%")}
						/>
						큼
						<br />
						<label>이미지 정렬</label>{" "}
						<input
							type="radio"
							name="imgSort"
							value="right"
							checked={imgSort === "right"}
							onChange={() => setImgSort("right")}
						/>
						오른쪽
						<input
							type="radio"
							name="imgSort"
							value="center"
							checked={imgSort === "center"}
							onChange={() => setImgSort("center")}
						/>
						중앙
						<input
							type="radio"
							name="imgSort"
							value="left"
							checked={imgSort === "left"}
							onChange={() => setImgSort("left")}
						/>
						왼쪽
						<br />
						<input
							type="file"
							onChange={handleImgaeUpload}
							accept="image/png, image/gif, image/jpeg, image/jpg"
						/>
					</div>
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
				<StyledPostContent
					dangerouslySetInnerHTML={{ __html: content }}
				></StyledPostContent>
			</StyledPostUploadPage>
		</AdminPage>
	);
};

const StyledPostContent = styled.div`
	min-height: calc(100vh - 700px);
	padding: 20px 0;
	white-space: pre-wrap;
	border: 1px solid black;
`;

export default PostUploadPage;
