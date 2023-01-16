import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Page from "../components/common/Page";

const PostPage = () => {
	const params = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		fetch(
			`https://port-0-medical-innovation-backend-1jx7m2glcz21n5v.gksl2.cloudtype.app/api/v1/post/${params.id}`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
				},
			}
		).then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					console.log(data);
					data.created_at = new Intl.DateTimeFormat("ko", {
						dateStyle: "long",
					}).format(new Date(data.created_at));
					setPost(data);
				});
			}
		});
	}, [params.id]);

	return (
		<Page>
			{post ? (
				<>
					<h1>{post.title}</h1>
					<StyledPostDetail>
						<span>
							<small>작성자</small>
							{post.author_name}
						</span>
						<span>
							<small>작성일</small> {post.created_at}
						</span>
						<span>
							<small>게시판</small> {post.board.name}
						</span>
					</StyledPostDetail>
					<StyledPostContent>{post.content}</StyledPostContent>
					<StyledPostFiles>
						{post.files ? (
							<>
								<span>첨부파일</span>
								{post.files.map((file) => {
									return (
										<a
											href={`https://port-0-medical-innovation-backend-1jx7m2glcz21n5v.gksl2.cloudtype.app/api/v1/file/download/${file}`}
										>
											{file}
										</a>
									);
								})}
							</>
						) : null}
					</StyledPostFiles>
				</>
			) : null}
		</Page>
	);
};

const StyledPostDetail = styled.div`
	& > span + span {
		margin-left: 10px;
	}

	& small {
		font-size: 12px;
		margin-right: 5px;
	}

	& span {
		font-size: 14px;
	}
`;

const StyledPostContent = styled.p`
	min-height: 500px;
	padding: 20px 0;
	white-space: pre-wrap;
`;

const StyledPostFiles = styled.div`
	display: flex;
	flex-direction: column;

	& span {
		font-size: 16px;
		margin-bottom: 20px;
	}

	& a:hover {
		text-decoration: underline;
	}
`;

export default PostPage;
