import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminPage from "components/admin/AdminPage";
import AdminTable from "components/admin/AdminTable";
import { API_URL } from "utils/const";
import AuthContext from "context/AuthContext";
import Message from "components/common/Message";
import LinkButton from "components/common/LinkButton";

const PostsPage = () => {
	const authCtx = useContext(AuthContext);

	const SIZE = 40;
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		axios({
			url: `${API_URL}/api/v1/post/all?limit=${SIZE}&skip=${page}`,
			method: "GET",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${authCtx.accessToken}`,
			},
		}).then((res) => {
			setPosts(res.data.posts);
			setTotal(res.data.total);
		});
	}, [authCtx, page]);

	const [posts, setPosts] = useState([]);

	return (
		<AdminPage>
			<h1>게시물</h1>
			<Message>
				tip : 게시물 삭제 후 복구가 불가능하니 신중하게 결정해주세요.
			</Message>
			<LinkButton to="/admin/post/upload" type="Link">
				게시물 업로드
			</LinkButton>
			<br />
			<AdminTable page={page} setPage={setPage} SIZE={SIZE} total={total}>
				<thead>
					<tr>
						<th>번호</th>
						<th>게시판</th>
						<th>제목</th>
						<th>작성자</th>
						<th>생성일</th>
						<th>수정일</th>
						<th>수정</th>
						<th>삭제</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => {
						return (
							<tr>
								<td>{post.id}</td>
								<td>{post.board?.name}</td>
								<td>{post.title}</td>
								<td>{post.author_name}</td>
								<td>{post.created_at.replace("T", " ")}</td>
								<td>{post.updated_at.replace("T", " ")}</td>
								<td>
									<Link to={`/admin/post/edit/${post.id}`}>수정</Link>
								</td>
								<td>
									<Link to={`/admin/post/delete/${post.id}`}>삭제</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</AdminTable>
		</AdminPage>
	);
};

export default PostsPage;
