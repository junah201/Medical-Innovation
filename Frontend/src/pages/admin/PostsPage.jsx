import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";

const PostsPage = () => {
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

		axios({
			url: `${API_URL}/api/v1/post/all?skip=0&limit=500`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setPosts(res.data.posts);
		});
	}, [navigate, authCtx]);

	const [posts, setPosts] = useState([]);

	return (
		<AdminPage>
			<h1>게시물</h1>
			<Message>
				tip : 게시물 삭제 후 복구가 불가능하니 신중하게 결정해주세요.
			</Message>
			<StyledPostContainer>
				<>
					<StyledPostItem>고유 id</StyledPostItem>
					<StyledPostItem>게시판</StyledPostItem>
					<StyledPostItem>제목</StyledPostItem>
					<StyledPostItem>작성자</StyledPostItem>
					<StyledPostItem>생성일</StyledPostItem>
					<StyledPostItem>수정일</StyledPostItem>
					<StyledPostItem>수정</StyledPostItem>
					<StyledPostItem>삭제</StyledPostItem>
				</>
				{posts.map((post) => {
					return <PostItem post={post} key={post.id} />;
				})}
			</StyledPostContainer>
		</AdminPage>
	);
};

const StyledPostContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

	border-top: 2px solid silver;
	border-left: 2px solid silver;

	& > div {
		border-right: 2px solid silver;
		border-bottom: 2px solid silver;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

const StyledPostItem = styled.div`
	text-align: center;
	padding: 5px;
`;

const PostItem = ({ post }) => {
	return (
		<>
			<StyledPostItem>{post.id}</StyledPostItem>
			<StyledPostItem>{post.board?.name}</StyledPostItem>
			<StyledPostItem>{post.title}</StyledPostItem>
			<StyledPostItem>{post.author_name}</StyledPostItem>
			<StyledPostItem>{post.created_at}</StyledPostItem>
			<StyledPostItem>{post.updated_at}</StyledPostItem>
			<StyledPostItem>
				<a href={`/admin/post/edit/${post.id}`}>수정하기</a>
			</StyledPostItem>
			<StyledPostItem>
				<a href={`/admin/post/delete/${post.id}`}>삭제하기</a>
			</StyledPostItem>
		</>
	);
};

export default PostsPage;
