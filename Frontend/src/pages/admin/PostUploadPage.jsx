import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";
import PostContent from "../../components/post/PostContent";
import { useNavigate } from "react-router-dom";

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

	const [imgSize, setImgSize] = useState("30%");
	const [imgSort, setImgSort] = useState("center");

	const [link, setLink] = useState("");
	const [linkPreview, setLinkPreview] = useState("");

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
				return `${prev}\n\n<div class="img-container ${imgSort}"><img width = ${imgSize} src="https://medical-innovation.s3.ap-northeast-2.amazonaws.com/upload/${res.data.filename}" /></div>\n\n`;
			});
		});
	};

	const handleLinkUpload = (e) => {
		e.preventDefault();

		setContent((prev) => {
			return `${prev} <a href="${link}">${linkPreview}</a> `;
		});
	};

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
					<textarea
						type="text"
						placeholder="Content"
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
					/>
					<br />
					<br />
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
							value="left"
							checked={imgSort === "left"}
							onChange={() => setImgSort("left")}
						/>
						<label>왼쪽</label>
						<input
							type="radio"
							name="imgSort"
							value="center"
							checked={imgSort === "center"}
							onChange={() => setImgSort("center")}
						/>
						<label>중앙</label>
						<input
							type="radio"
							name="imgSort"
							value="right"
							checked={imgSort === "right"}
							onChange={() => setImgSort("right")}
						/>
						<label>오른쪽</label>
						<br />
						<input
							type="file"
							onChange={handleImgaeUpload}
							accept="image/png, image/gif, image/jpeg, image/jpg"
						/>
					</div>
					<br />
					<div>
						<label>링크 첨부</label>
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
						<input
							type="text"
							placeholder="미리보기 텍스트"
							value={linkPreview}
							onChange={(e) => {
								setLinkPreview(e.target.value);
							}}
						/>
						<br />
						<button onClick={handleLinkUpload}>링크 추가</button>
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
				<PostContent content={content} />
			</StyledPostUploadPage>
		</AdminPage>
	);
};

export default PostUploadPage;
