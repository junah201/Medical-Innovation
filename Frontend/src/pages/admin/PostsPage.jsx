import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "../../components/admin/AdminPage";
import AdminTable from "../../components/admin/AdminTable";
import { API_URL } from "../../utils/const";
import AuthContext from "../../context/AuthContext";
import Message from "../../components/common/Message";

const PostsPage = () => {
	const authCtx = useContext(AuthContext);

	useEffect(() => {
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
	}, [authCtx]);

	const [posts, setPosts] = useState([]);

	return (
		<AdminPage>
			<h1>게시물</h1>
			<Message>
				tip : 게시물 삭제 후 복구가 불가능하니 신중하게 결정해주세요.
			</Message>
			<AdminTable column={8}>
				<>
					<div>고유 id</div>
					<div>게시판</div>
					<div>제목</div>
					<div>작성자</div>
					<div>생성일</div>
					<div>수정일</div>
					<div>수정</div>
					<div>삭제</div>
				</>
				{posts.map((post) => {
					return (
						<>
							<div>{post.id}</div>
							<div>{post.board?.name}</div>
							<div>{post.title}</div>
							<div>{post.author_name}</div>
							<div>{post.created_at}</div>
							<div>{post.updated_at}</div>
							<div>
								<Link to={`/admin/post/edit/${post.id}`}>수정하기</Link>
							</div>
							<div>
								<Link to={`/admin/post/delete/${post.id}`}>삭제하기</Link>
							</div>
						</>
					);
				})}
			</AdminTable>
		</AdminPage>
	);
};

export default PostsPage;
