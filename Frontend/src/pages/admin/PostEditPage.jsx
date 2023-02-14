import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthContext from "../../context/AuthContext";
import AdminPage from "../../components/admin/AdminPage";
import Message from "../../components/common/Message";

import { API_URL } from "../../utils/const";

const StyledPostEditPage = styled.div`
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
		width: 800px;
		padding: 10px 20px;
		font-size: 20px;
		font-weight: 600;
		margin: auto 0;
		background-color: #ffffff;
	}

	& form {
		display: flex;
		flex-direction: column;
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

	return (
		<AdminPage>
			<StyledPostEditPage>
				<h1>게시물 수정</h1>
				<Message>tip : </Message>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="제목"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					></input>
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
					></textarea>
					<br />
					<br />
					<button type="submit">수정하기</button>
				</form>
			</StyledPostEditPage>
		</AdminPage>
	);
};

export default PostEditPage;
